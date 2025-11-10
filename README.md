# UniiLanguage 🎨

An educational drawing game for PreK-3rd grade students that generates random silly sentences and challenges users to draw them in three progressively longer timed rounds (10s, 30s, 60s).

**Created by**: Unii Learning Labs

---

## 🎮 Play Now!

- GitHub Pages: `https://mariyaaborisa.github.io/UniiLanguage/`

---

## ✨ Features

### Drawing Tools
- ✏️ **Pen Tool** - Draw with custom colors
- 🧹 **Eraser** - Fix mistakes without clearing
- 🎨 **Color Picker** - Choose any color
- 📏 **Brush Size** - Adjustable 1-20px
- 🗑️ **Clear Canvas** - Start over anytime
- 💾 **Save Drawings** - Download as PNG

### Educational Value
- 📚 **Grammar Practice** - Sentences with proper structure
- 🧠 **Reading Comprehension** - Visual interpretation
- ⏱️ **Time Management** - Drawing under time pressure
- 🎯 **Progressive Difficulty** - 10s → 30s → 60s rounds
- 🎭 **Creativity** - Free-form artistic expression

### Built With
- HTML, CSS, and vanilla JavaScript
- Static hosting on GitHub Pages or Netlify

---

## 🚀 Quick Start

### Play Locally (Python)

```bash
cd UniiLanguage/uniilanguage
python3 -m http.server 8000
```

Open: `http://localhost:8000/src/index.html`

### Play Locally (Node.js)

```bash
npm install -g http-server
cd UniiLanguage/uniilanguage
http-server -p 8000
```

Open: `http://localhost:8000/src/index.html`

---

## 📁 Project Structure

```
UniiLanguage/
├── index.html                    # Root redirect for GitHub Pages
├── netlify.toml                  # Netlify configuration & security headers
├── DEPLOYMENT_GUIDE.md           # Complete deployment instructions
├── FUNCTIONALITY_REVIEW.md       # Security audit & recommendations
├── README.md                     # This file
│
└── uniilanguage/
    ├── index.css                 # Main styles
    ├── images/                   # Logos, backgrounds, characters
    │   ├── backgrounds/
    │   ├── characters/
    │   └── logo.svg
    │
    ├── prompt generation/
    │   ├── prek3.js              # Word lists by grade level
    │   └── prompt_generator.js   # Sentence generation + XSS protection
    │
    ├── drawing javscript files/
    │   ├── unified-drawing.js    # Main drawing engine (NEW!)
    │   ├── drawing10.js          # Legacy (deprecated)
    │   ├── drawing30.js          # Legacy (deprecated)
    │   └── drawing60.js          # Legacy (deprecated)
    │
    └── src/
        ├── index.html            # Home page
        ├── h2p.html              # How to Play (page 1)
        ├── h2p2.html             # How to Play (page 2)
        ├── Drawing_10_sec.html   # 10 second round
        ├── Drawing_30_sec.html   # 30 second round
        ├── Drawing_60_sec.html   # 60 second round
        ├── End_screen.html       # Game complete screen
        │
        └── components/
            ├── clarity-tracker.js # Microsoft Clarity analytics
            └── utilities.js       # Helper functions (deprecated)
```

---

## 📚 Additional Documentation

- **Deployment**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for hosting options, analytics setup, and recommended configuration.
- **Security Review**: See [FUNCTIONALITY_REVIEW.md](./FUNCTIONALITY_REVIEW.md) for the latest audit notes and hardening checklist.

---

## 🤝 Contributing

Pull requests are welcome! If you spot a bug or have an idea for a new feature, open an issue or submit a PR so we can keep improving UniiLanguage together.

