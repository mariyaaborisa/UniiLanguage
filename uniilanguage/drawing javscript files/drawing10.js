const canvas2 = document.getElementById("canvas")
const canvas = canvas2.getContext('2d');
const roundTransition = document.getElementById("roundTransition")
const nextRoundButton = document.getElementById("nextRoundButton")
const saveDrawingButton = document.getElementById("saveDrawingButton")
var timer = 10

canvas2.style = "position: absolute; top: 25%; left: 24%; right: 0px; bottom: 0px; margin: 0px; border: 5px solid rgba(0, 0, 0, 0.2); border-radius: 30px;";

window.addEventListener("resize", resize)
resize()
if (roundTransition) {
    roundTransition.setAttribute('aria-hidden', 'true')
}
if (saveDrawingButton) {
    saveDrawingButton.addEventListener('click', onSave)
}
let mousePos = {
    x:0,
    y:0
}

window.addEventListener("mousemove", draw)
window.addEventListener("mousedown", mousePosition)
window.addEventListener("mouseenter", mousePosition)

function mousePosition(e){
    mousePos.x = e.offsetX;
    mousePos.y = e.offsetY;
}

function resize(){
    canvas.canvas.width = 1000
    canvas.canvas.height = 500

}

function draw(e){
    if (e.buttons !=1){
        return;
    }
    canvas.beginPath();
    canvas.lineCap = "round"
    canvas.strokeStyle = pen_color;
    canvas.lineWidth = 5
    canvas.moveTo(mousePos.x, mousePos.y)
    mousePosition(e)
    canvas.lineTo(mousePos.x, mousePos.y)
    canvas.stroke()
}

var pen_color = randomColor();

function randomColor(){
    var colors = ["#3B99F2", "#5EAE66", "#5F45C9"]
    var color = colors[Math.floor(Math.random()*colors.length)];
    localStorage.setItem('color', color)
    return color
}

function onSave(){
    canvas2.toBlob((blob) => {
        console.log(blob)
        const timestamp = Date.now().toString()
        const new_element = document.createElement('a')
        document.body.append(new_element)
        new_element.download = "UniiLang-" + timestamp + ".png"
        new_element.href = URL.createObjectURL(blob)
        new_element.click()
        new_element.remove()
    })
}

function showRoundTransition(){
    if (!roundTransition) {
        return
    }
    roundTransition.hidden = false
    roundTransition.setAttribute('aria-hidden', 'false')
    requestAnimationFrame(() => {
        roundTransition.classList.add('is-visible')
    })
}

function timerFunction(){
    timer--;
    if (timer === 0){
        window.removeEventListener("mousemove", draw)
        showRoundTransition()
        if (nextRoundButton){
            nextRoundButton.focus()
        }
        clearInterval(timerHandle)
    }
}

const timerHandle = setInterval(timerFunction, 1000)
