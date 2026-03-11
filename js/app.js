// Productivity Dashboard Application

/**
 * LocalStorage Availability Check
 * Requirements: 6.1, 6.2
 */

/**
 * Check if LocalStorage is available and functional
 * Tests by attempting to write and read a test value
 * @returns {boolean} True if LocalStorage is available, false otherwise
 * Requirements: 6.1
 */
function isLocalStorageAvailable() {
  try {
    const testKey = '__localStorage_test__';
    const testValue = 'test';
    
    // Attempt to write to LocalStorage
    localStorage.setItem(testKey, testValue);
    
    // Attempt to read from LocalStorage
    const retrievedValue = localStorage.getItem(testKey);
    
    // Clean up test data
    localStorage.removeItem(testKey);
    
    // Verify the value was correctly stored and retrieved
    return retrievedValue === testValue;
  } catch (error) {
    console.warn('LocalStorage is not available:', error);
    return false;
  }
}

/**
 * Display warning message if LocalStorage is unavailable
 * Requirements: 6.2
 */
function showLocalStorageWarning() {
  // Create warning banner
  const warningBanner = document.createElement('div');
  warningBanner.className = 'storage-warning';
  
  // Create content container using DOM methods (not innerHTML)
  const contentDiv = document.createElement('div');
  contentDiv.className = 'storage-warning-content';
  
  const strong = document.createElement('strong');
  strong.textContent = '⚠️ Warning:';
  
  const message = document.createTextNode(' LocalStorage is unavailable or disabled. Your data will not be saved between sessions.');
  
  contentDiv.appendChild(strong);
  contentDiv.appendChild(message);
  warningBanner.appendChild(contentDiv);
  
  // Insert at the top of the body
  document.body.insertBefore(warningBanner, document.body.firstChild);
}

/**
 * Validation Utilities
 * Requirements: 3.3, 4.3, 7.1, 7.2
 */

/**
 * Validate Task model
 * @param {Object} task - Task object to validate
 * @returns {boolean} True if task is valid, false otherwise
 * Requirements: 3.3
 */
function validateTask(task) {
  // Check if task object exists
  if (!task || typeof task !== 'object') {
    return false;
  }
  
  // Check required properties exist
  if (!task.id || typeof task.id !== 'string') {
    return false;
  }
  
  if (typeof task.text !== 'string') {
    return false;
  }
  
  // Check text is non-empty after trimming
  const trimmedText = task.text.trim();
  if (trimmedText.length === 0) {
    return false;
  }
  
  // Check text doesn't exceed 200 characters
  if (task.text.length > 200) {
    return false;
  }
  
  if (typeof task.completed !== 'boolean') {
    return false;
  }
  
  if (typeof task.createdAt !== 'number' || !Number.isFinite(task.createdAt)) {
    return false;
  }
  
  return true;
}

/**
 * Validate Link model
 * @param {Object} link - Link object to validate
 * @returns {boolean} True if link is valid, false otherwise
 * Requirements: 4.3
 */
function validateLink(link) {
  // Check if link object exists
  if (!link || typeof link !== 'object') {
    return false;
  }
  
  // Check required properties exist
  if (!link.id || typeof link.id !== 'string') {
    return false;
  }
  
  if (typeof link.name !== 'string') {
    return false;
  }
  
  // Check name is non-empty after trimming
  const trimmedName = link.name.trim();
  if (trimmedName.length === 0) {
    return false;
  }
  
  // Check name doesn't exceed 50 characters
  if (link.name.length > 50) {
    return false;
  }
  
  if (typeof link.url !== 'string') {
    return false;
  }
  
  // Validate URL format
  if (!validateUrl(link.url)) {
    return false;
  }
  
  return true;
}

/**
 * Validate URL format
 * @param {string} url - URL string to validate
 * @returns {boolean} True if URL is valid format, false otherwise
 * Requirements: 4.3, 7.2
 */
function validateUrl(url) {
  if (typeof url !== 'string') {
    return false;
  }
  
  // Check for valid http:// or https:// protocol
  const urlPattern = /^https?:\/\/.+/;
  
  if (!urlPattern.test(url)) {
    return false;
  }
  
  // Reject javascript: protocol URLs for security
  if (url.toLowerCase().includes('javascript:')) {
    return false;
  }
  
  return true;
}

/**
 * Sanitize text to prevent XSS attacks
 * Uses textContent approach instead of innerHTML
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 * Requirements: 7.1
 */
function sanitizeText(text) {
  if (typeof text !== 'string') {
    return '';
  }
  
  // Create a temporary element to use textContent for sanitization
  const tempElement = document.createElement('div');
  tempElement.textContent = text;
  
  // Return the sanitized text
  return tempElement.textContent;
}

/**
 * GreetingModule - Displays current time, date, and contextual greeting
 * Requirements: 1.1, 1.2
 */
class GreetingModule {
  /**
   * Initialize the GreetingModule
   * @param {HTMLElement} containerElement - DOM element to render greeting into
   */
  constructor(containerElement) {
    this.container = containerElement;
    this.currentTime = new Date();
  }

  /**
   * Get contextual greeting based on current hour
   * Morning: 5-11, Afternoon: 12-17, Evening: 18-21, Night: 22-4
   * @returns {string} Greeting message
   */
  getGreeting() {
    const hour = this.currentTime.getHours();
    
    if (hour >= 5 && hour <= 11) {
      return 'Good Morning';
    } else if (hour >= 12 && hour <= 17) {
      return 'Good Afternoon';
    } else if (hour >= 18 && hour <= 21) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  }

  /**
   * Update current time and date
   * Called every second to keep time display current
   */
  updateClock() {
    this.currentTime = new Date();
    this.render();
  }

  /**
   * Render greeting, time, and date to DOM
   * Updates the container element with current greeting and time information
   * Uses DOM methods to prevent XSS attacks
   */
  render() {
    const greeting = this.getGreeting();
    
    // Format time in 12-hour format with AM/PM
    let hours = this.currentTime.getHours();
    const minutes = this.currentTime.getMinutes();
    const seconds = this.currentTime.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const timeString = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
    
    // Format date in readable format
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = this.currentTime.toLocaleDateString('en-US', options);
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create elements using DOM methods (not innerHTML)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'greeting-content';
    
    const greetingText = document.createElement('h1');
    greetingText.className = 'greeting-text';
    greetingText.textContent = greeting;
    
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'time-display';
    timeDisplay.textContent = timeString;
    
    const dateDisplay = document.createElement('div');
    dateDisplay.className = 'date-display';
    dateDisplay.textContent = dateString;
    
    contentDiv.appendChild(greetingText);
    contentDiv.appendChild(timeDisplay);
    contentDiv.appendChild(dateDisplay);
    
    this.container.appendChild(contentDiv);
  }
}

/**
 * FocusTimer - Pomodoro-style 25-minute countdown timer
 * Requirements: 2.1, 2.2
 */
class FocusTimer {
  /**
   * Initialize the FocusTimer
   * @param {HTMLElement} containerElement - DOM element to render timer into
   */
  constructor(containerElement) {
    this.container = containerElement;
    this.defaultDuration = 1500; // 25 minutes in seconds
    this.timeRemaining = this.defaultDuration;
    this.isRunning = false;
    this.intervalId = null;
    
    // Preset durations in seconds
    this.presets = [
      { name: '5 min', duration: 300 },
      { name: '10 min', duration: 600 },
      { name: '15 min', duration: 900 },
      { name: '25 min', duration: 1500 },
      { name: '30 min', duration: 1800 },
      { name: '45 min', duration: 2700 },
      { name: '60 min', duration: 3600 }
    ];
  }

  /**
   * Format seconds to MM:SS format
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string (MM:SS)
   */
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  /**
   * Start the timer countdown
   * Creates interval that calls tick() every 1000ms
   * Ensures only one timer interval runs at a time
   * Requirements: 2.2, 2.3, 8.3, 10.3
   */
  start() {
    // Prevent multiple timers from running (ensures single interval)
    if (this.isRunning || this.timeRemaining <= 0) {
      return;
    }
    
    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
    this.updateButtonStates();
  }

  /**
   * Stop/pause the timer
   * Clears interval and sets isRunning to false
   * Requirements: 2.4
   */
  stop() {
    if (!this.isRunning) {
      return;
    }
    
    this.isRunning = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updateButtonStates();
  }

  /**
   * Reset timer to default duration
   * Stops timer and restores timeRemaining to default
   * Requirements: 2.5
   */
  reset() {
    this.stop();
    this.timeRemaining = this.defaultDuration;
    this.updateDisplay();
    this.updateButtonStates();
  }

  /**
   * Set custom timer duration
   * @param {number} seconds - Duration in seconds
   */
  setDuration(seconds) {
    if (this.isRunning) {
      return; // Don't allow changing duration while timer is running
    }
    
    this.defaultDuration = seconds;
    this.timeRemaining = seconds;
    this.updateDisplay();
    this.updateButtonStates();
  }

  /**
   * Timer tick - decrements time and updates display
   * Called every second by setInterval
   * Optimized to complete in <16ms for 60fps
   * Requirements: 2.3, 2.6, 8.3
   */
  tick() {
    // Performance monitoring
    const startTime = performance.now();
    
    if (!this.isRunning) {
      return;
    }
    
    this.timeRemaining--;
    this.updateDisplay();
    
    // Check if timer completed
    if (this.timeRemaining <= 0) {
      this.stop();
      alert('Focus session complete!');
      this.reset();
    }
    
    // Log performance warning if tick takes too long
    const endTime = performance.now();
    const tickTime = endTime - startTime;
    if (tickTime > 16) {
      console.warn(`Timer tick took ${tickTime.toFixed(2)}ms (target: <16ms)`);
    }
  }

  /**
   * Update timer display in DOM
   * Updates only the display element without re-rendering entire component
   */
  updateDisplay() {
    const display = this.container.querySelector('.timer-display');
    if (display) {
      display.textContent = this.formatTime(this.timeRemaining);
    }
  }

  /**
   * Update button states based on timer state
   * Enables/disables buttons appropriately
   */
  updateButtonStates() {
    const startBtn = this.container.querySelector('.btn-start');
    const stopBtn = this.container.querySelector('.btn-stop');
    const resetBtn = this.container.querySelector('.btn-reset');
    const presetBtns = this.container.querySelectorAll('.btn-preset');
    
    if (startBtn) {
      startBtn.disabled = this.isRunning || this.timeRemaining <= 0;
    }
    if (stopBtn) {
      stopBtn.disabled = !this.isRunning;
    }
    if (resetBtn) {
      resetBtn.disabled = this.isRunning;
    }
    
    // Disable preset buttons while timer is running
    presetBtns.forEach(btn => {
      btn.disabled = this.isRunning;
    });
  }

  /**
   * Render timer display and control buttons to DOM
   * Creates the timer interface with display and start/stop/reset buttons
   * Uses DOM methods to prevent XSS attacks
   */
  render() {
    const timeDisplay = this.formatTime(this.timeRemaining);
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create elements using DOM methods (not innerHTML)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'timer-content';
    
    const title = document.createElement('h2');
    title.className = 'timer-title';
    title.textContent = 'Focus Timer';
    
    // Create preset duration buttons
    const presetsDiv = document.createElement('div');
    presetsDiv.className = 'timer-presets';
    
    this.presets.forEach(preset => {
      const presetBtn = document.createElement('button');
      presetBtn.className = 'btn-preset';
      presetBtn.textContent = preset.name;
      presetBtn.setAttribute('data-duration', preset.duration);
      
      // Highlight active preset
      if (preset.duration === this.defaultDuration) {
        presetBtn.classList.add('active');
      }
      
      presetBtn.addEventListener('click', () => {
        this.setDuration(preset.duration);
        // Update active state
        presetsDiv.querySelectorAll('.btn-preset').forEach(btn => {
          btn.classList.remove('active');
        });
        presetBtn.classList.add('active');
      });
      
      presetsDiv.appendChild(presetBtn);
    });
    
    const display = document.createElement('div');
    display.className = 'timer-display';
    display.textContent = timeDisplay;
    
    const controls = document.createElement('div');
    controls.className = 'timer-controls';
    
    const startBtn = document.createElement('button');
    startBtn.className = 'btn-start';
    startBtn.setAttribute('data-action', 'start');
    startBtn.textContent = 'Start';
    
    const stopBtn = document.createElement('button');
    stopBtn.className = 'btn-stop';
    stopBtn.setAttribute('data-action', 'stop');
    stopBtn.disabled = true;
    stopBtn.textContent = 'Stop';
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn-reset';
    resetBtn.setAttribute('data-action', 'reset');
    resetBtn.textContent = 'Reset';
    
    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(resetBtn);
    
    contentDiv.appendChild(title);
    contentDiv.appendChild(presetsDiv);
    contentDiv.appendChild(display);
    contentDiv.appendChild(controls);
    
    this.container.appendChild(contentDiv);
    
    // Add event listeners for control buttons
    startBtn.addEventListener('click', () => this.start());
    stopBtn.addEventListener('click', () => this.stop());
    resetBtn.addEventListener('click', () => this.reset());
  }
}

/**
 * TodoList - Task management with LocalStorage persistence
 * Requirements: 3.1, 5.1, 5.2, 6.1
 */
class TodoList {
  /**
   * Initialize the TodoList
   * @param {HTMLElement} containerElement - DOM element to render todo list into
   */
  constructor(containerElement) {
    this.container = containerElement;
    this.tasks = [];
    this.sortBy = 'date'; // Default sort: date (creation order)
  }

  /**
   * Load tasks from LocalStorage
   * Retrieves tasks from 'productivity-tasks' key
   * Handles corrupted data gracefully with try-catch
   * Gracefully handles LocalStorage unavailability
   * @returns {Array} Array of valid Task objects
   * Requirements: 5.2, 6.1
   */
  loadTasks() {
    // Check if LocalStorage is available
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage unavailable, starting with empty task list');
      return [];
    }
    
    try {
      const serialized = localStorage.getItem('productivity-tasks');
      
      // No data exists, return empty array
      if (!serialized) {
        return [];
      }
      
      // Parse JSON data
      const tasks = JSON.parse(serialized);
      
      // Validate structure is an array
      if (!Array.isArray(tasks)) {
        console.error('Invalid tasks data structure: expected array');
        return [];
      }
      
      // Validate each task and filter out invalid ones
      const validTasks = tasks.filter(task => {
        const isValid = validateTask(task);
        if (!isValid) {
          console.warn('Filtered out invalid task during load:', task);
        }
        return isValid;
      });
      
      return validTasks;
      
    } catch (error) {
      console.error('Failed to load tasks from LocalStorage:', error);
      // Return empty array on error to allow app to continue
      return [];
    }
  }

  /**
   * Save tasks to LocalStorage
   * Persists tasks array to 'productivity-tasks' key
   * Gracefully handles LocalStorage unavailability
   * Handles QuotaExceededError with user-friendly message
   * @returns {boolean} True on success, false on failure
   * Requirements: 5.1, 6.1, 6.2
   */
  saveTasks() {
    // Check if LocalStorage is available
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage unavailable, operating with in-memory storage only');
      return false;
    }
    
    try {
      const serialized = JSON.stringify(this.tasks);
      localStorage.setItem('productivity-tasks', serialized);
      return true;
    } catch (error) {
      console.error('Failed to save tasks to LocalStorage:', error);
      
      // Check if it's a quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.error('LocalStorage quota exceeded - cannot save tasks');
        alert('Storage quota exceeded! Your tasks cannot be saved. Please delete some data or clear browser storage.');
      }
      
      return false;
    }
  }

  /**
   * Generate unique ID for task
   * Uses Date.now() + random string for uniqueness
   * @returns {string} Unique identifier
   * Requirements: 10.1
   */
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Add new task to the list
   * Validates input before creating task
   * @param {string} text - Task text description
   * @returns {boolean} True if task added successfully, false otherwise
   * Requirements: 3.2, 3.3, 10.1
   */
  addTask(text) {
    // Validate input is a string
    if (typeof text !== 'string') {
      console.error('Task text must be a string');
      return false;
    }

    // Trim whitespace
    const trimmedText = text.trim();

    // Validate non-empty
    if (trimmedText.length === 0) {
      console.error('Task text cannot be empty');
      return false;
    }

    // Validate max length (200 characters)
    if (text.length > 200) {
      console.error('Task text exceeds maximum length of 200 characters');
      return false;
    }

    // Check for duplicate tasks (case-insensitive comparison)
    const isDuplicate = this.tasks.some(task => 
      task.text.toLowerCase() === trimmedText.toLowerCase()
    );

    if (isDuplicate) {
      console.error('A task with this text already exists');
      return false;
    }

    // Create new task object
    const task = {
      id: this.generateId(),
      text: trimmedText,
      completed: false,
      createdAt: Date.now()
    };

    // Add to tasks array
    this.tasks.push(task);

    // Persist to LocalStorage
    this.saveTasks();

    return true;
  }

  /**
   * Toggle task completion status
   * Flips the completed boolean while preserving other properties
   * @param {string} id - Task identifier
   * @returns {boolean} True if task toggled successfully, false otherwise
   * Requirements: 3.4, 10.2
   */
  toggleTask(id) {
    // Find task by id
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      console.error('Task not found:', id);
      return false;
    }

    // Flip completed status
    task.completed = !task.completed;

    // Persist to LocalStorage
    this.saveTasks();

    return true;
  }

  /**
   * Delete task from the list
   * Removes task from tasks array
   * @param {string} id - Task identifier
   * @returns {boolean} True if task deleted successfully, false otherwise
   * Requirements: 3.5
   */
  deleteTask(id) {
    // Find task index
    const index = this.tasks.findIndex(t => t.id === id);

    if (index === -1) {
      console.error('Task not found:', id);
      return false;
    }

    // Remove task from array
    this.tasks.splice(index, 1);

    // Persist to LocalStorage
    this.saveTasks();

    return true;
  }

  /**
   * Sort tasks based on current sort option
   * @returns {Array} Sorted copy of tasks array
   */
  getSortedTasks() {
    const tasksCopy = [...this.tasks];
    
    switch (this.sortBy) {
      case 'date':
        // Sort by creation date (oldest first)
        return tasksCopy.sort((a, b) => a.createdAt - b.createdAt);
      
      case 'date-desc':
        // Sort by creation date (newest first)
        return tasksCopy.sort((a, b) => b.createdAt - a.createdAt);
      
      case 'alpha':
        // Sort alphabetically (A-Z)
        return tasksCopy.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
      
      case 'alpha-desc':
        // Sort alphabetically (Z-A)
        return tasksCopy.sort((a, b) => b.text.toLowerCase().localeCompare(a.text.toLowerCase()));
      
      case 'status':
        // Sort by completion status (incomplete first)
        return tasksCopy.sort((a, b) => {
          if (a.completed === b.completed) {
            return a.createdAt - b.createdAt; // Same status, sort by date
          }
          return a.completed ? 1 : -1; // Incomplete tasks first
        });
      
      case 'status-desc':
        // Sort by completion status (completed first)
        return tasksCopy.sort((a, b) => {
          if (a.completed === b.completed) {
            return a.createdAt - b.createdAt; // Same status, sort by date
          }
          return a.completed ? -1 : 1; // Completed tasks first
        });
      
      default:
        return tasksCopy;
    }
  }

  /**
   * Set sort option and re-render
   * @param {string} sortOption - Sort option (date, date-desc, alpha, alpha-desc, status, status-desc)
   */
  setSortBy(sortOption) {
    this.sortBy = sortOption;
    this.render();
  }

  /**
   * Edit task text
   * Updates task text with validation
   * @param {string} id - Task identifier
   * @param {string} newText - New task text
   * @returns {boolean} True if task edited successfully, false otherwise
   * Requirements: 3.6, 3.3
   */
  editTask(id, newText) {
    // Validate input is a string
    if (typeof newText !== 'string') {
      console.error('Task text must be a string');
      return false;
    }

    // Trim whitespace
    const trimmedText = newText.trim();

    // Validate non-empty
    if (trimmedText.length === 0) {
      console.error('Task text cannot be empty');
      return false;
    }

    // Validate max length (200 characters)
    if (newText.length > 200) {
      console.error('Task text exceeds maximum length of 200 characters');
      return false;
    }

    // Find task by id
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      console.error('Task not found:', id);
      return false;
    }

    // Update task text
    task.text = trimmedText;

    // Persist to LocalStorage
    this.saveTasks();

    return true;
  }

    /**
     * Render the todo list UI
     * Creates task list DOM structure dynamically
     * Uses textContent to prevent XSS attacks
     * Requirements: 3.1, 7.1
     */
    /**
       * Render the todo list UI
       * Creates task list DOM structure dynamically
       * Uses textContent to prevent XSS attacks
       * Uses DocumentFragment for batch DOM updates (performance optimization)
       * Uses event delegation for task list (performance optimization)
       * Requirements: 3.1, 7.1, 8.1, 8.2
       */
      render() {
        // Batch DOM reads and writes to minimize reflows
        const startTime = performance.now();

        // Clear existing content
        this.container.innerHTML = '';

        // Create title
        const title = document.createElement('h3');
        title.className = 'todo-title';
        title.textContent = 'To-Do List';
        this.container.appendChild(title);

        // Create sort controls
        const sortContainer = document.createElement('div');
        sortContainer.className = 'todo-sort';
        
        const sortLabel = document.createElement('span');
        sortLabel.className = 'todo-sort-label';
        sortLabel.textContent = 'Sort by:';
        
        const sortSelect = document.createElement('select');
        sortSelect.className = 'todo-sort-select';
        
        const sortOptions = [
          { value: 'date', label: 'Date (Oldest)' },
          { value: 'date-desc', label: 'Date (Newest)' },
          { value: 'alpha', label: 'A-Z' },
          { value: 'alpha-desc', label: 'Z-A' },
          { value: 'status', label: 'Incomplete First' },
          { value: 'status-desc', label: 'Completed First' }
        ];
        
        sortOptions.forEach(opt => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.label;
          if (opt.value === this.sortBy) {
            option.selected = true;
          }
          sortSelect.appendChild(option);
        });
        
        sortSelect.addEventListener('change', (e) => {
          this.setSortBy(e.target.value);
        });
        
        sortContainer.appendChild(sortLabel);
        sortContainer.appendChild(sortSelect);
        this.container.appendChild(sortContainer);

        // Create form for adding tasks
        const form = document.createElement('form');
        form.className = 'todo-form';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todo-input';
        input.placeholder = 'Add a new task...';
        input.maxLength = 200;

        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.className = 'todo-add-btn';
        addButton.textContent = 'Add';

        form.appendChild(input);
        form.appendChild(addButton);
        this.container.appendChild(form);

        // Create error message container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'todo-error';
        errorContainer.style.display = 'none';
        this.container.appendChild(errorContainer);

        // Add form submit handler
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const text = input.value;

          // Validate and add task
          if (!text || text.trim().length === 0) {
            errorContainer.textContent = 'Task cannot be empty';
            errorContainer.style.display = 'block';
            return;
          }

          if (text.length > 200) {
            errorContainer.textContent = 'Task text exceeds maximum length of 200 characters';
            errorContainer.style.display = 'block';
            return;
          }

          // Check for duplicate before adding
          const isDuplicate = this.tasks.some(task => 
            task.text.toLowerCase() === text.trim().toLowerCase()
          );

          if (isDuplicate) {
            errorContainer.textContent = 'This task already exists in your list';
            errorContainer.style.display = 'block';
            return;
          }

          // Add task
          const success = this.addTask(text);

          if (success) {
            input.value = '';
            errorContainer.style.display = 'none';
            this.render(); // Re-render to show new task
          } else {
            errorContainer.textContent = 'Failed to add task';
            errorContainer.style.display = 'block';
          }
        });

        // Create task list container
        const taskList = document.createElement('ul');
        taskList.className = 'todo-list';

        // Check if there are tasks
        if (this.tasks.length === 0) {
          const emptyMessage = document.createElement('li');
          emptyMessage.className = 'todo-empty';
          emptyMessage.textContent = 'No tasks yet. Add one above!';
          taskList.appendChild(emptyMessage);
        } else {
          // Use DocumentFragment for batch DOM updates (performance optimization)
          const fragment = document.createDocumentFragment();

          // Get sorted tasks
          const sortedTasks = this.getSortedTasks();

          // Render each task
          sortedTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'todo-item';
            taskItem.setAttribute('data-task-id', task.id);

            // Add completed class if task is completed
            if (task.completed) {
              taskItem.classList.add('completed');
            }

            // Create checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('data-action', 'toggle');

            // Create task text element - use textContent to prevent XSS
            const taskText = document.createElement('span');
            taskText.className = 'todo-text';
            taskText.textContent = task.text; // Use textContent, not innerHTML

            // Create actions container
            const actions = document.createElement('div');
            actions.className = 'todo-actions';

            // Create edit button
            const editButton = document.createElement('button');
            editButton.className = 'todo-edit-btn';
            editButton.textContent = 'Edit';
            editButton.setAttribute('data-action', 'edit');

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'todo-delete-btn';
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('data-action', 'delete');

            // Assemble task item
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(actions);

            // Add to fragment instead of directly to DOM
            fragment.appendChild(taskItem);
          });

          // Single DOM update with all tasks at once
          taskList.appendChild(fragment);

          // Use event delegation for all task interactions (performance optimization)
          taskList.addEventListener('click', (e) => {
            const target = e.target;
            const taskItem = target.closest('.todo-item');

            if (!taskItem) return;

            const taskId = taskItem.getAttribute('data-task-id');
            const action = target.getAttribute('data-action');

            // Handle checkbox toggle
            if (target.type === 'checkbox' || action === 'toggle') {
              this.toggleTask(taskId);
              this.render(); // Re-render to update UI
            } else if (action === 'delete') {
              const success = this.deleteTask(taskId);
              if (success) {
                this.render(); // Re-render to remove task
              } else {
                alert('Failed to delete task');
              }
            } else if (action === 'edit') {
              const task = this.tasks.find(t => t.id === taskId);
              if (!task) return;

              const newText = prompt('Edit task:', task.text);
              if (newText !== null) {
                if (!newText || newText.trim().length === 0) {
                  alert('Task cannot be empty');
                  return;
                }
                if (newText.length > 200) {
                  alert('Task text exceeds maximum length of 200 characters');
                  return;
                }
                const success = this.editTask(taskId, newText);
                if (success) {
                  this.render(); // Re-render to show updated task
                } else {
                  alert('Failed to edit task');
                }
              }
            }
          });
        }

        this.container.appendChild(taskList);

        // Log render time for performance monitoring
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        if (renderTime > 50) {
          console.warn(`TodoList render took ${renderTime.toFixed(2)}ms (target: <50ms)`);
        }
      }


}

/**
 * QuickLinks Class
 * Manages favorite website shortcuts with LocalStorage persistence
 * 
 * Requirements: 4.1, 5.1, 5.2, 6.1
 */
class QuickLinks {
  /**
   * Initialize QuickLinks with container element
   * @param {HTMLElement} containerElement - DOM element to render links into
   */
  constructor(containerElement) {
    this.container = containerElement;
    this.links = [];
    this.loadLinks();
  }

  /**
   * Load links from LocalStorage
   * Handles corrupted data gracefully by returning empty array
   * Gracefully handles LocalStorage unavailability
   * 
   * Requirements: 5.2, 6.1
   * @returns {Array} Array of valid link objects
   */
  loadLinks() {
    // Check if LocalStorage is available
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage unavailable, starting with empty links list');
      this.links = [];
      return;
    }
    
    try {
      const serialized = localStorage.getItem('productivity-links');
      
      if (!serialized) {
        this.links = [];
        return;
      }
      
      const links = JSON.parse(serialized);
      
      // Validate structure
      if (!Array.isArray(links)) {
        console.error('Invalid links data structure: expected array');
        this.links = [];
        return;
      }
      
      // Validate each link using validateLink function
      const validLinks = links.filter(link => {
        const isValid = validateLink(link);
        if (!isValid) {
          console.warn('Filtered out invalid link during load:', link);
        }
        return isValid;
      });
      
      this.links = validLinks;
      
    } catch (error) {
      console.error('Failed to load links from LocalStorage:', error);
      this.links = [];
    }
  }

  /**
   * Save links to LocalStorage
   * Persists current links array to browser storage
   * Gracefully handles LocalStorage unavailability
   * Handles QuotaExceededError with user-friendly message
   * 
   * Requirements: 5.1, 6.1, 6.2
   * @returns {boolean} True if save succeeded, false otherwise
   */
  saveLinks() {
    // Check if LocalStorage is available
    if (!isLocalStorageAvailable()) {
      console.warn('LocalStorage unavailable, operating with in-memory storage only');
      return false;
    }
    
    try {
      const serialized = JSON.stringify(this.links);
      localStorage.setItem('productivity-links', serialized);
      return true;
    } catch (error) {
      console.error('Failed to save links to LocalStorage:', error);
      
      // Check if it's a quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.error('LocalStorage quota exceeded - cannot save links');
        alert('Storage quota exceeded! Your links cannot be saved. Please delete some data or clear browser storage.');
      }
      
      return false;
    }
  }

  /**
   * Add a new link with validation
   * Auto-prepends https:// if protocol is missing
   * 
   * Requirements: 4.2, 4.3, 10.1
   * @param {string} name - Display name for the link
   * @param {string} url - URL to link to
   * @returns {boolean} True if link was added successfully, false otherwise
   */
  addLink(name, url) {
    // Validate name
    if (!name || typeof name !== 'string') {
      console.error('Link name is required');
      return false;
    }
    
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      console.error('Link name cannot be empty');
      return false;
    }
    
    if (trimmedName.length > 50) {
      console.error('Link name cannot exceed 50 characters');
      return false;
    }
    
    // Validate and process URL
    if (!url || typeof url !== 'string') {
      console.error('Link URL is required');
      return false;
    }
    
    let processedUrl = url.trim();
    
    // Auto-prepend https:// if protocol is missing
    if (!processedUrl.match(/^https?:\/\//i)) {
      processedUrl = 'https://' + processedUrl;
    }
    
    // Validate the processed URL
    if (!validateUrl(processedUrl)) {
      console.error('Invalid URL format');
      return false;
    }
    
    // Generate unique ID using Date.now() + Math.random()
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    // Create new link object
    const link = {
      id: id,
      name: trimmedName,
      url: processedUrl
    };
    
    // Add to links array
    this.links.push(link);
    
    // Persist to LocalStorage
    this.saveLinks();
    
    return true;
  }

  /**
   * Delete a link by ID
   * 
   * Requirements: 4.6
   * @param {string} id - Unique identifier of the link to delete
   * @returns {boolean} True if link was deleted, false if not found
   */
  deleteLink(id) {
    const initialLength = this.links.length;
    
    // Remove link with matching ID
    this.links = this.links.filter(link => link.id !== id);
    
    // Check if a link was actually removed
    if (this.links.length === initialLength) {
      console.warn('Link not found with id:', id);
      return false;
    }
    
    // Persist to LocalStorage
    this.saveLinks();
    
    return true;
  }

  /**
   * Render the QuickLinks UI
   * Creates link buttons dynamically with name and delete button
   * Links open in new tab with target="_blank" rel="noopener noreferrer"
   * Uses DocumentFragment for batch DOM updates (performance optimization)
   * Uses event delegation for link list (performance optimization)
   *
   * Requirements: 4.1, 7.1, 8.1, 8.2
   */
  render() {
      // Batch DOM reads and writes to minimize reflows
      const startTime = performance.now();

      // Clear existing content
      this.container.innerHTML = '';

      // Create title
      const title = document.createElement('h3');
      title.className = 'links-title';
      title.textContent = 'Quick Links';
      this.container.appendChild(title);

      // Create form for adding links
      const form = document.createElement('form');
      form.className = 'links-form';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'links-name-input';
      nameInput.placeholder = 'Link name...';
      nameInput.maxLength = 50;

      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.className = 'links-url-input';
      urlInput.placeholder = 'URL...';

      const addButton = document.createElement('button');
      addButton.type = 'submit';
      addButton.className = 'links-add-btn';
      addButton.textContent = 'Add';

      form.appendChild(nameInput);
      form.appendChild(urlInput);
      form.appendChild(addButton);
      this.container.appendChild(form);

      // Create error message container
      const errorContainer = document.createElement('div');
      errorContainer.className = 'links-error';
      errorContainer.style.display = 'none';
      this.container.appendChild(errorContainer);

      // Add form submit handler
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const url = urlInput.value;

        // Validate inputs
        if (!name || name.trim().length === 0) {
          errorContainer.textContent = 'Link name cannot be empty';
          errorContainer.style.display = 'block';
          return;
        }

        if (name.length > 50) {
          errorContainer.textContent = 'Link name exceeds maximum length of 50 characters';
          errorContainer.style.display = 'block';
          return;
        }

        if (!url || url.trim().length === 0) {
          errorContainer.textContent = 'URL cannot be empty';
          errorContainer.style.display = 'block';
          return;
        }

        // Add link
        const success = this.addLink(name, url);

        if (success) {
          nameInput.value = '';
          urlInput.value = '';
          errorContainer.style.display = 'none';
          this.render(); // Re-render to show new link
        } else {
          errorContainer.textContent = 'Failed to add link. Please check the URL format.';
          errorContainer.style.display = 'block';
        }
      });

      // Create links list container
      const linksList = document.createElement('div');
      linksList.className = 'links-list';

      // Check if there are links
      if (this.links.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'links-empty';
        emptyMessage.textContent = 'No links yet. Add one above!';
        linksList.appendChild(emptyMessage);
      } else {
        // Use DocumentFragment for batch DOM updates (performance optimization)
        const fragment = document.createDocumentFragment();

        // Render each link
        this.links.forEach(link => {
          const linkItem = document.createElement('div');
          linkItem.className = 'link-card';
          linkItem.setAttribute('data-link-id', link.id);
          linkItem.setAttribute('data-link-url', link.url);

          // Create link name
          const linkName = document.createElement('div');
          linkName.className = 'link-name';
          linkName.textContent = link.name; // Use textContent to prevent XSS

          // Create link URL display
          const linkUrl = document.createElement('div');
          linkUrl.className = 'link-url';
          linkUrl.textContent = link.url;

          // Create delete button
          const deleteButton = document.createElement('button');
          deleteButton.className = 'link-delete-btn';
          deleteButton.textContent = 'Delete';
          deleteButton.setAttribute('data-action', 'delete');

          // Assemble link item
          linkItem.appendChild(linkName);
          linkItem.appendChild(linkUrl);
          linkItem.appendChild(deleteButton);

          // Add to fragment instead of directly to DOM
          fragment.appendChild(linkItem);
        });

        // Single DOM update with all links at once
        linksList.appendChild(fragment);

        // Use event delegation for all link interactions (performance optimization)
        linksList.addEventListener('click', (e) => {
          const target = e.target;
          const linkItem = target.closest('.link-card');

          if (!linkItem) return;

          const linkId = linkItem.getAttribute('data-link-id');
          const linkUrl = linkItem.getAttribute('data-link-url');
          const action = target.getAttribute('data-action');

          if (action === 'delete') {
            e.preventDefault();
            e.stopPropagation();
            const success = this.deleteLink(linkId);

            if (success) {
              this.render(); // Re-render to remove link
            } else {
              alert('Failed to delete link');
            }
          } else {
            // Click anywhere else on the card opens the link
            window.open(linkUrl, '_blank', 'noopener,noreferrer');
          }
        });
      }

      this.container.appendChild(linksList);

      // Log render time for performance monitoring
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      if (renderTime > 50) {
        console.warn(`QuickLinks render took ${renderTime.toFixed(2)}ms (target: <50ms)`);
      }
    }

}

/**
 * Initialize the application
 * Called when DOM is fully loaded
 * Requirements: 5.1, 5.2, 6.1, 6.2
 */
function initializeApp() {
  // Check LocalStorage availability and show warning if unavailable
  if (!isLocalStorageAvailable()) {
    showLocalStorageWarning();
  }
  
  // Query all container elements from DOM
  const greetingContainer = document.getElementById('greeting-section');
  const timerContainer = document.getElementById('timer-section');
  const todoContainer = document.getElementById('todo-section');
  const linksContainer = document.getElementById('links-section');
  
  // Instantiate all four module classes
  const greeting = new GreetingModule(greetingContainer);
  const timer = new FocusTimer(timerContainer);
  const todoList = new TodoList(todoContainer);
  const quickLinks = new QuickLinks(linksContainer);
  
  // Load persisted data from LocalStorage
  todoList.tasks = todoList.loadTasks();
  quickLinks.loadLinks();
  
  // Render all modules to display initial state
  greeting.render();
  timer.render();
  todoList.render();
  quickLinks.render();
  
  // Set up clock update interval (every 1000ms)
  setInterval(() => greeting.updateClock(), 1000);
}

// Wait for DOM to be ready
// Requirements: 9.1
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeApp();
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
});
