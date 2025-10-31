/**
 * Unified Drawing Module for UniiLanguage
 * Eliminates code duplication and adds enhanced functionality
 */

class DrawingCanvas {
    constructor(timerDuration) {
        this.canvas2 = document.getElementById("canvas");
        this.canvas = this.canvas2.getContext('2d');
        this.timer = timerDuration;
        this.isDrawing = false;
        this.currentTool = 'pen';
        this.currentColor = this.initializeColor();
        this.lineWidth = 5;

        this.mousePos = {
            x: 0,
            y: 0
        };

        this.initialize();
    }

    initialize() {
        // Canvas styling
        this.canvas2.style = "position: absolute; top: 25%; left: 24%; right: 0px; bottom: 0px; margin: 0px; border: 5px solid rgba(0, 0, 0, 0.2); border-radius: 30px;";

        // Set up canvas size
        this.resize();
        window.addEventListener("resize", () => this.resize());

        // Mouse events
        window.addEventListener("mousemove", (e) => this.draw(e));
        window.addEventListener("mousedown", (e) => {
            this.mousePosition(e);
            this.isDrawing = true;
        });
        window.addEventListener("mouseup", () => this.isDrawing = false);
        window.addEventListener("mouseenter", (e) => this.mousePosition(e));
        window.addEventListener("mouseleave", () => this.isDrawing = false);

        // Touch events for mobile support
        this.canvas2.addEventListener("touchstart", (e) => this.handleTouchStart(e), { passive: false });
        this.canvas2.addEventListener("touchmove", (e) => this.handleTouchMove(e), { passive: false });
        this.canvas2.addEventListener("touchend", () => this.isDrawing = false);

        // Save button
        const saveButton = document.querySelector("#save");
        if (saveButton) {
            saveButton.addEventListener('click', () => this.onSave());
        }

        // Set up toolbar if it exists
        this.setupToolbar();

        // Start timer
        this.timerInterval = setInterval(() => this.timerFunction(), 1000);

        // Canvas fallback check
        if (!this.canvas2.getContext) {
            alert("Your browser does not support HTML5 Canvas. Please use a modern browser.");
        }
    }

    initializeColor() {
        const colors = ["#3B99F2", "#5EAE66", "#5F45C9"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        localStorage.setItem('color', color);
        return color;
    }

    setupToolbar() {
        // Color picker
        const colorPicker = document.querySelector("#colorPicker");
        if (colorPicker) {
            colorPicker.value = this.currentColor;
            colorPicker.addEventListener('change', (e) => {
                this.currentColor = e.target.value;
                this.currentTool = 'pen';
            });
        }

        // Brush size
        const brushSize = document.querySelector("#brushSize");
        if (brushSize) {
            brushSize.value = this.lineWidth;
            brushSize.addEventListener('input', (e) => {
                this.lineWidth = parseInt(e.target.value);
            });
        }

        // Eraser button
        const eraserBtn = document.querySelector("#eraserBtn");
        if (eraserBtn) {
            eraserBtn.addEventListener('click', () => {
                this.currentTool = 'eraser';
                eraserBtn.classList.add('active');
                const penBtn = document.querySelector("#penBtn");
                if (penBtn) penBtn.classList.remove('active');
            });
        }

        // Pen button
        const penBtn = document.querySelector("#penBtn");
        if (penBtn) {
            penBtn.classList.add('active');
            penBtn.addEventListener('click', () => {
                this.currentTool = 'pen';
                penBtn.classList.add('active');
                const eraserBtn = document.querySelector("#eraserBtn");
                if (eraserBtn) eraserBtn.classList.remove('active');
            });
        }

        // Clear button
        const clearBtn = document.querySelector("#clearBtn");
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCanvas());
        }
    }

    mousePosition(e) {
        this.mousePos.x = e.offsetX;
        this.mousePos.y = e.offsetY;
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas2.getBoundingClientRect();
        this.mousePos.x = (touch.clientX - rect.left) * (this.canvas2.width / rect.width);
        this.mousePos.y = (touch.clientY - rect.top) * (this.canvas2.height / rect.height);
        this.isDrawing = true;
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.isDrawing) return;

        const touch = e.touches[0];
        const rect = this.canvas2.getBoundingClientRect();
        const touchX = (touch.clientX - rect.left) * (this.canvas2.width / rect.width);
        const touchY = (touch.clientY - rect.top) * (this.canvas2.height / rect.height);

        this.canvas.beginPath();
        this.canvas.lineCap = "round";

        if (this.currentTool === 'eraser') {
            this.canvas.strokeStyle = '#FFFFFF';
            this.canvas.lineWidth = this.lineWidth * 3;
        } else {
            this.canvas.strokeStyle = this.currentColor;
            this.canvas.lineWidth = this.lineWidth;
        }

        this.canvas.moveTo(this.mousePos.x, this.mousePos.y);
        this.mousePos.x = touchX;
        this.mousePos.y = touchY;
        this.canvas.lineTo(this.mousePos.x, this.mousePos.y);
        this.canvas.stroke();
    }

    resize() {
        this.canvas.canvas.width = 1000;
        this.canvas.canvas.height = 500;
    }

    draw(e) {
        if (e.buttons != 1 || !this.isDrawing) {
            return;
        }

        this.canvas.beginPath();
        this.canvas.lineCap = "round";

        if (this.currentTool === 'eraser') {
            this.canvas.strokeStyle = '#FFFFFF';
            this.canvas.lineWidth = this.lineWidth * 3;
        } else {
            this.canvas.strokeStyle = this.currentColor;
            this.canvas.lineWidth = this.lineWidth;
        }

        this.canvas.moveTo(this.mousePos.x, this.mousePos.y);
        this.mousePosition(e);
        this.canvas.lineTo(this.mousePos.x, this.mousePos.y);
        this.canvas.stroke();
    }

    clearCanvas() {
        if (confirm("Are you sure you want to clear your drawing?")) {
            this.canvas.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
        }
    }

    onSave() {
        this.canvas2.toBlob((blob) => {
            if (!blob) {
                alert("Error saving drawing. Please try again.");
                return;
            }

            const timestamp = Date.now().toString();
            const url = URL.createObjectURL(blob);
            const new_element = document.createElement('a');

            new_element.download = "UniiLang-" + timestamp + ".png";
            new_element.href = url;

            document.body.append(new_element);
            new_element.click();
            new_element.remove();

            // Revoke blob URL to free memory (security & performance)
            setTimeout(() => URL.revokeObjectURL(url), 100);
        });
    }

    timerFunction() {
        this.timer--;

        // Update timer display if it exists
        const timerDisplay = document.querySelector("#timerDisplay");
        if (timerDisplay) {
            timerDisplay.textContent = this.timer;
        }

        if (this.timer == 0) {
            this.endDrawing();
        }
    }

    endDrawing() {
        // Stop timer
        clearInterval(this.timerInterval);

        // Remove drawing event listeners
        window.removeEventListener("mousemove", (e) => this.draw(e));
        this.isDrawing = false;

        // Show popup
        const popup0 = document.getElementById("myPopup0");
        if (popup0) popup0.style.visibility = "Visible";

        const blackbg = document.getElementById("myPopupBlackBg");
        if (blackbg) blackbg.style.visibility = "Visible";

        const popupbg = document.getElementById("myPopupBg");
        if (popupbg) popupbg.style.visibility = "Visible";

        const popup1 = document.getElementById("myPopup1");
        if (popup1) popup1.style.visibility = "Visible";

        const popup2 = document.getElementById("myPopup2");
        if (popup2) popup2.style.visibility = "Visible";
    }

    cleanup() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }
}

// Factory function to create drawing canvas with specific timer
function initDrawingCanvas(timerDuration) {
    return new DrawingCanvas(timerDuration);
}
