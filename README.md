# 🍅 Pomodoro Study Timer

A beautiful, feature-rich Pomodoro timer web application built to demonstrate professional Git workflow practices and modern web development techniques.

[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/Shrikantkumar975/Pomodoro-Timer)

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

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Shrikantkumar975/Pomodoro-Timer.git

# Navigate to directory
cd Pomodoro-Timer

# Open index.html in your browser or use a local server
python -m http.server 8000
# Visit http://localhost:8000
```

**Live Demo:** [https://shrikantkumar975.github.io/Pomodoro-Timer/](https://shrikantkumar975.github.io/Pomodoro-Timer/)

---

## 📖 How to Use

### Timer Controls
1. **Start** - Begin the Pomodoro session
2. **Pause** - Temporarily stop the timer (shows "Resume")
3. **Reset** - Return to initial time
4. **Sound Toggle** (🔔) - Enable/disable notifications

### Settings
- Adjust **Work Duration** (1-60 minutes)
- Adjust **Break Duration** (1-30 minutes)

### Task Management
1. Type your task in the input field
2. Press **Enter** or click **+ Add**
3. Check off tasks when complete
4. Delete tasks with the **×** button

---

## 🌳 Git Workflow

This project demonstrates a complete Git branching workflow with multiple feature branches, merge conflict resolution, and best practices.

### Visual Git Graph

![Git Workflow Graph](uploaded_image_1766731151983.png)

*Actual Git commit history showing branch creation, merging, and conflict resolution*

### Branch Structure

| Branch | Purpose | Key Changes |
|--------|---------|-------------|
| `main` | Production code | All stable features merged |
| `feature` | Task management | TaskList class, LocalStorage, CRUD operations |
| `test` | UI experiments | Background colors, layout testing |
| `experiment` | Advanced features | Hover effects, JS animations |
| `bugfix` | Bug fixes | Timer speed, sound toggle, resume button |

### Workflow Steps Demonstrated

1. ✅ Created multiple feature branches from `main`
2. ✅ Developed features independently on separate branches
3. ✅ Merged branches back into `main`
4. ✅ Resolved merge conflicts in `index.html` and `style.css`
5. ✅ Used proper commit messages
6. ✅ Maintained clean Git history

---

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties, animations
- **JavaScript (ES6+)** - Classes, LocalStorage API, Notifications API
- **Font Awesome** - Icons
- **Google Fonts** - Inter font family
- **Git & GitHub** - Version control and deployment

---

## 🐛 Bug Fixes

During development, 4 critical bugs were identified and fixed:

1. **Timer Speed** - Fixed 2x speed issue caused by duplicate initialization
2. **Tasks Not Working** - Implemented missing TaskList class
3. **Sound Toggle** - Fixed missing SoundToggle instantiation
4. **Resume Button** - Fixed state management for pause/resume

All fixes verified through comprehensive testing.

---

## 📁 Project Structure

```
Pomodoro-Timer/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Application logic
│   ├── PomodoroTimer   # Timer class
│   ├── SoundToggle     # Sound control
│   └── TaskList        # Task management
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

---

## 📚 What I Learned

- ✅ Git branching and merging strategies
- ✅ Handling merge conflicts manually
- ✅ Remote repository management (GitHub)
- ✅ Modern JavaScript (ES6+ classes, arrow functions)
- ✅ CSS custom properties and animations
- ✅ LocalStorage and browser APIs
- ✅ Responsive web design
- ✅ Object-oriented programming

---

## 📊 Project Stats

- **Commits:** 20+
- **Branches:** 5 (main + 4 feature branches)
- **Files:** 3 core files (HTML, CSS, JS)
- **Lines of Code:** ~1,800+
- **Features:** 12+ major features

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Shrikantkumar975**
- GitHub: [@Shrikantkumar975](https://github.com/Shrikantkumar975)
- Repository: [Pomodoro-Timer](https://github.com/Shrikantkumar975/Pomodoro-Timer)

---

## 🙏 Acknowledgments

- Pomodoro Technique® by Francesco Cirillo
- Inspiration from modern productivity apps
- Git workflow best practices

---

<div align="center">

**Built with 💜 for productivity and learning**

⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/Shrikantkumar975/Pomodoro-Timer/issues) · [Request Feature](https://github.com/Shrikantkumar975/Pomodoro-Timer/issues)

</div>
