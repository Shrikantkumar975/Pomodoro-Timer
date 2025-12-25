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
        this.soundToggle = document.getElementById('soundToggle');
        this.workDurationInput = document.getElementById('workDuration');
        this.breakDurationInput = document.getElementById('breakDuration');
        this.progressCircle = document.querySelector('.progress-ring-circle-fill');

        // Circle calculations
        this.radius = 130;
        this.circumference = 2 * Math.PI * this.radius;

        this.init();
    }

    init() {
        // Set up progress circle
        this.progressCircle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.progressCircle.style.strokeDashoffset = 0;

        // Event listeners
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

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

            // Update button states
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;

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
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Update progress circle
        const progress = this.timeLeft / this.totalTime;
        const offset = this.circumference - (progress * this.circumference);
        this.progressCircle.style.strokeDashoffset = offset;
    }

    showNotification(message) {
        // Simple notification (can be enhanced with browser notifications later)
        if (this.soundEnabled && 'Notification' in window && Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: message,
                icon: '🍅'
            });
        }
    }
}

// ========== Task List Logic ==========

class TaskList {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');

        this.init();
    }

    init() {
        // Load tasks from localStorage
        this.loadTasks();

        // Event listeners
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        this.render();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();

        if (taskText === '') {
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.saveTasks();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
    }

    render() {
        this.taskList.innerHTML = '';

        if (this.tasks.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.completed ? ' completed' : '');

            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="task-delete" data-id="${task.id}">×</button>
            `;

            // Add event listeners
            const checkbox = li.querySelector('.task-checkbox');
            const deleteBtn = li.querySelector('.task-delete');

            checkbox.addEventListener('change', () => this.toggleTask(task.id));
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            this.taskList.appendChild(li);
        });
    }

    saveTasks() {
        localStorage.setItem('pomodoroTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('pomodoroTasks');
        if (saved) {
            this.tasks = JSON.parse(saved);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize timer and task list when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();

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
