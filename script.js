// ========== Pomodoro Timer Logic ==========

class PomodoroTimer {
    constructor() {
        // Timer state
        this.isRunning = false;
        this.isPaused = false;
        this.currentMode = 'work'; // 'work' or 'break'
        this.timeLeft = 25 * 60; // seconds
        this.totalTime = 25 * 60;
        this.timerInterval = null;
        this.sessionsCompleted = 0;
        this.soundEnabled = true;

        // Settings
        this.workDuration = 25; // minutes
        this.breakDuration = 5; // minutes

        // DOM Elements
        this.timeDisplay = document.getElementById('timeDisplay');
        this.modeDisplay = document.getElementById('currentMode');
        this.sessionCount = document.getElementById('sessionCount');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.workDurationInput = document.getElementById('workDuration');
        this.breakDurationInput = document.getElementById('breakDuration');
        this.soundToggle = document.getElementById('soundToggle');
        this.progressCircle = document.querySelector('.progress-ring-circle-fill');

        // Circle calculations
        this.radius = 130;
        this.circumference = 2 * Math.PI * this.radius;

        this.init();
    }

    init() {
        // Set up progress circle
        this.progressCircle.style.strokeDasharray = `${this.circumference} ${this.circumference} `;
        this.progressCircle.style.strokeDashoffset = 0;

        // Event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.soundToggle.addEventListener('click', () => this.toggleSound());

        this.workDurationInput.addEventListener('change', (e) => {
            this.workDuration = parseInt(e.target.value);
            if (this.currentMode === 'work' && !this.isRunning) {
                this.reset();
            }
        });

        this.breakDurationInput.addEventListener('change', (e) => {
            this.breakDuration = parseInt(e.target.value);
            if (this.currentMode === 'break' && !this.isRunning) {
                this.reset();
            }
        });

        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isPaused = false;

            // Clear any existing interval first (safeguard against multiple intervals)
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }

            // Update button states
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;

            // Reset button text to "Start" when resuming
            this.startBtn.querySelector('span').textContent = 'Start';

            // Start countdown
            this.timerInterval = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.isPaused = true;

            clearInterval(this.timerInterval);

            // Update button states
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.startBtn.querySelector('span').textContent = 'Resume';
        }
    }

    reset() {
        this.isRunning = false;
        this.isPaused = false;

        clearInterval(this.timerInterval);

        // Reset time based on current mode
        if (this.currentMode === 'work') {
            this.timeLeft = this.workDuration * 60;
            this.totalTime = this.workDuration * 60;
        } else {
            this.timeLeft = this.breakDuration * 60;
            this.totalTime = this.breakDuration * 60;
        }

        // Update button states
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.startBtn.querySelector('span').textContent = 'Start';

        this.updateDisplay();
    }

    tick() {
        this.timeLeft--;

        if (this.timeLeft < 0) {
            this.completeSession();
            return;
        }

        this.updateDisplay();
    }

    completeSession() {
        clearInterval(this.timerInterval);

        if (this.currentMode === 'work') {
            // Work session completed
            this.sessionsCompleted++;
            this.sessionCount.textContent = this.sessionsCompleted;

            // Switch to break
            this.currentMode = 'break';
            this.modeDisplay.textContent = 'Break Time';
            this.timeLeft = this.breakDuration * 60;
            this.totalTime = this.breakDuration * 60;

            this.showNotification('Work session complete! Time for a break 🎉');
        } else {
            // Break completed
            this.currentMode = 'work';
            this.modeDisplay.textContent = 'Focus Time';
            this.timeLeft = this.workDuration * 60;
            this.totalTime = this.workDuration * 60;

            this.showNotification('Break over! Ready to focus again? 💪');
        }

        // Auto-start next session or wait for user
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.startBtn.querySelector('span').textContent = 'Start';

        this.updateDisplay();
    }

    updateDisplay() {
        // Update time display
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} `;

        // Update progress circle
        const progress = this.timeLeft / this.totalTime;
        const offset = this.circumference - (progress * this.circumference);
        this.progressCircle.style.strokeDashoffset = offset;
    }

    showNotification(message) {
        if ('Notification' in window && Notification.permission === 'granted' && this.soundEnabled) {
            new Notification('Pomodoro Timer', {
                body: message,
                icon: '🍅'
            });
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;

        // Update button appearance
        if (this.soundEnabled) {
            this.soundToggle.classList.remove('muted');
            this.soundToggle.innerHTML = '<i class="fas fa-bell"></i>';
        } else {
            this.soundToggle.classList.add('muted');
            this.soundToggle.innerHTML = '<i class="fas fa-bell-slash"></i>';
        }
    }
}

// Initialize timer and task list when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
    const taskList = new TaskList();

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key.toLowerCase()) {
            case ' ':  // Spacebar - Start/Pause
                e.preventDefault();
                if (timer.isRunning) {
                    timer.pause();
                } else {
                    timer.start();
                }
                break;
            case 'r':  // R - Reset
                e.preventDefault();
                timer.reset();
                break;
            case 's':  // S - Toggle sound
                e.preventDefault();
                if (timer.soundToggle) {
                    timer.toggleSound();
                }
                break;
        }
    });
});

// ========== TaskList Class ==========
class TaskList {
    constructor() {
        this.tasks = this.loadTasks();
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.tasksList = document.getElementById('tasksList');

        this.init();
    }

    init() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        this.renderTasks();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (!taskText) return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = '';
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    renderTasks() {
        this.tasksList.innerHTML = '';

        this.tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item${task.completed ? ' completed' : ''}`;

            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="task-delete">×</button>
            `;

            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => this.toggleTask(task.id));

            const deleteBtn = taskItem.querySelector('.task-delete');
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            this.tasksList.appendChild(taskItem);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTasks() {
        localStorage.setItem('pomodoroTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('pomodoroTasks');
        return saved ? JSON.parse(saved) : [];
    }
}
