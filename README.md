# 🍅 Pomodoro Study Timer

A beautiful, feature-rich Pomodoro timer web application demonstrating professional Git workflow and modern web development practices.

[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/Shrikantkumar975/Pomodoro-Timer)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## ✨ Features

- ⏰ **Customizable Timer** - Adjust work (1-60 min) and break (1-30 min) durations
- 📊 **Session Tracking** - Count completed Pomodoro sessions
- 📝 **Task Management** - Add, complete, and delete tasks with LocalStorage persistence
- 🔔 **Browser Notifications** - Get notified when sessions complete
- 🔕 **Sound Toggle** - Enable/disable notification sounds
- ⌨️ **Keyboard Shortcuts** - Space (start/pause), R (reset), S (sound toggle)
- 🎨 **Modern Dark Theme** - Beautiful gradient design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast & Lightweight** - No dependencies, pure vanilla JavaScript

---

## 🚀 Quick Start

### Option 1: Live Demo
Visit: [https://shrikantkumar975.github.io/Pomodoro-Timer/](https://shrikantkumar975.github.io/Pomodoro-Timer/)

### Option 2: Local Setup

```bash
# Clone the repository
git clone https://github.com/Shrikantkumar975/Pomodoro-Timer.git

# Navigate to directory
cd Pomodoro-Timer

# Open index.html in your browser
# Or use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## 📖 How to Use

### Timer Controls
- **Start**: Begin Pomodoro session
- **Pause**: Temporarily stop timer
- **Reset**: Return to initial time
- **Sound Toggle (🔔/🔕)**: Enable/disable notifications

### Keyboard Shortcuts
- `Space`: Start/Pause timer
- `R`: Reset timer
- `S`: Toggle sound

### Settings
- Adjust work duration (default: 25 minutes)
- Adjust break duration (default: 5 minutes)
- Changes apply on next reset

### Task Management
1. Type task in input field
2. Press **Enter** or click **+ Add**
3. Check off completed tasks
4. Delete tasks with **×** button

---

## 🛠️ Technologies

- **HTML5** - Semantic structure
- **CSS3** - Modern styling, animations, custom properties
- **JavaScript (ES6+)** - Classes, arrow functions, modules
- **LocalStorage API** - Data persistence
- **Notifications API** - Browser notifications
- **Git & GitHub** - Version control

---

## 🎓 Git Workflow Demonstration

This project showcases professional DevOps practices:

### Branch Strategy
```
master
├── feature (Task management)
├── test (UI experiments)
├── experiment (Advanced features)
└── bugfix (Bug fixes)
```

### Key Commits
- Initial setup and base features
- CSS improvements and modern design
- Feature branch development (task list)
- Multi-branch parallel development
- Merge conflict resolution
- Documentation and deployment

See [PRESENTATION.md](PRESENTATION.md) for detailed DevOps breakdown.

---

## 📂 Project Structure

```
Pomodoro-Timer/
├── index.html          # Main application
├── style.css           # Styling (~600 lines)
├── script.js           # Logic (~220 lines)
├── README.md           # Documentation
├── LICENSE MIT         # MIT License license
├── CHANGELOG.md        # Version history
├── PRESENTATION.md     # DevOps presentation
└── .gitignore          # Git ignore rules
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shrikantkumar975**
- GitHub: [@Shrikantkumar975](https://github.com/Shrikantkumar975)
- Repository: [Pomodoro-Timer](https://github.com/Shrikantkumar975/Pomodoro-Timer)

---

## 🙏 Acknowledgments

- Pomodoro Technique® by Francesco Cirillo
- Google Fonts (Inter family)
- Modern web design inspiration from various productivity apps

---

## 📊 Project Stats

- **Total Commits**: 15+
- **Branches**: 5 (master + 4 feature branches)
- **Files**: 3 core files (HTML, CSS, JS)
- **Lines of Code**: ~1,500+
- **Features**: 10+ major features

---

<div align="center">

**Built with 💜 for productivity and learning**

⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/Shrikantkumar975/Pomodoro-Timer/issues) · [Request Feature](https://github.com/Shrikantkumar975/Pomodoro-Timer/issues)

</div>
