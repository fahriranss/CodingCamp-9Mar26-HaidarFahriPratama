# Implementation Plan: Productivity Dashboard

## Overview

This plan implements a lightweight, client-side productivity dashboard using vanilla HTML, CSS, and JavaScript. The implementation follows a modular approach with four main ES6 classes (GreetingModule, FocusTimer, TodoList, QuickLinks) that manage their own state and DOM rendering. All data persists to browser LocalStorage with comprehensive error handling and input validation.

## Tasks

- [x] 1. Set up project structure and HTML foundation
  - Create directory structure: css/ and js/ folders
  - Create index.html with semantic HTML5 structure
  - Define container elements for all four modules (greeting, timer, todo, links)
  - Add meta tags for viewport and charset
  - Link stylesheet and JavaScript file
  - _Requirements: 9.1 (Browser compatibility)_

- [ ] 2. Implement CSS styling
  - [x] 2.1 Create css/styles.css with base styles
    - Define CSS variables for colors, spacing, and typography
    - Implement responsive layout with CSS Grid or Flexbox
    - Style container sections with cards/panels
    - Add mobile-responsive breakpoints
    - _Requirements: 9.1 (Modern browser support)_
  
  - [x] 2.2 Style greeting and timer sections
    - Style time display with large, readable font
    - Style greeting text with appropriate hierarchy
    - Style timer display and control buttons
    - Add visual feedback for button states (hover, active, disabled)
    - _Requirements: 1.1, 2.1_
  
  - [x] 2.3 Style task list and quick links sections
    - Style task items with checkbox, text, and action buttons
    - Style completed tasks with strikethrough and opacity
    - Style quick links as buttons or cards
    - Style input fields and forms
    - Add smooth transitions for interactions
    - _Requirements: 3.1, 4.1_

- [ ] 3. Implement GreetingModule class
  - [x] 3.1 Create GreetingModule class with constructor and core methods
    - Implement constructor(containerElement)
    - Implement getGreeting() method with time-based logic (Morning: 5-11, Afternoon: 12-17, Evening: 18-21, Night: 22-4)
    - Implement updateClock() method to get current time and date
    - Implement render() method to update DOM with greeting and time
    - _Requirements: 1.1, 1.2_
  
  - [ ]* 3.2 Write unit tests for GreetingModule
    - Test getGreeting() returns correct greeting for each time period
    - Test updateClock() formats time correctly
    - Test render() updates DOM elements
    - _Requirements: 1.1, 1.2_

- [ ] 4. Implement FocusTimer class
  - [x] 4.1 Create FocusTimer class with state management
    - Implement constructor(containerElement) with initial state (timeRemaining: 1500, isRunning: false, intervalId: null)
    - Implement formatTime(seconds) to convert seconds to MM:SS format
    - Implement render() method to create timer display and control buttons
    - _Requirements: 2.1, 2.2_
  
  - [x] 4.2 Implement timer control methods
    - Implement start() method to begin countdown with setInterval
    - Implement stop() method to pause timer and clear interval
    - Implement reset() method to restore timer to 25:00
    - Implement tick() method to decrement time and update display
    - Add completion alert when timer reaches 0
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [ ]* 4.3 Write property test for timer bounds
    - **Property 3: Timer Bounds**
    - **Validates: Requirements 2.1, 8.3**
    - Verify 0 ≤ timeRemaining ≤ 1500 for all timer operations
  
  - [ ]* 4.4 Write unit tests for FocusTimer
    - Test start/stop/reset state transitions
    - Test tick() decrements time correctly
    - Test formatTime() produces correct MM:SS output
    - Test completion alert triggers at 0
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 5. Checkpoint - Verify greeting and timer functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement data models and validation utilities
  - [x] 6.1 Create validation functions for Task and Link models
    - Implement validateTask(task) to check id, text, completed, createdAt properties
    - Implement validateLink(link) to check id, name, url properties
    - Implement validateUrl(url) with regex pattern /^https?:\/\/.+/
    - Implement sanitizeText(text) to prevent XSS (use textContent approach)
    - _Requirements: 3.3, 4.3, 7.1, 7.2_
  
  - [ ]* 6.2 Write property test for input validation
    - **Property 9: Input Validation**
    - **Validates: Requirements 3.3, 4.3, 7.1**
    - Generate random strings and verify validation catches all invalid inputs

- [ ] 7. Implement TodoList class with LocalStorage persistence
  - [x] 7.1 Create TodoList class with storage methods
    - Implement constructor(containerElement) with empty tasks array
    - Implement loadTasks() to retrieve from localStorage.getItem('productivity-tasks')
    - Implement saveTasks() to persist with localStorage.setItem('productivity-tasks')
    - Add error handling for corrupted data (try-catch with JSON.parse)
    - _Requirements: 3.1, 5.1, 5.2, 6.1_
  
  - [x] 7.2 Implement task CRUD operations
    - Implement addTask(text) with validation (non-empty, max 200 chars)
    - Generate unique IDs using Date.now() + Math.random()
    - Implement toggleTask(id) to flip completed status
    - Implement deleteTask(id) to remove task from array
    - Implement editTask(id, newText) with validation
    - Call saveTasks() after every mutation
    - _Requirements: 3.2, 3.3, 10.1, 10.2_
  
  - [x] 7.3 Implement TodoList render method
    - Create task list DOM structure dynamically
    - Render each task with checkbox, text, edit, and delete buttons
    - Apply completed styling (strikethrough) based on task.completed
    - Add event listeners for toggle, edit, delete actions
    - Use textContent (not innerHTML) to prevent XSS
    - _Requirements: 3.1, 7.1_
  
  - [ ]* 7.4 Write property test for data persistence
    - **Property 1: Data Persistence**
    - **Validates: Requirements 5.1, 5.2**
    - Verify all task modifications are persisted to LocalStorage before function returns
  
  - [ ]* 7.5 Write property test for ID uniqueness
    - **Property 2: ID Uniqueness**
    - **Validates: Requirements 10.1**
    - Generate random task additions and verify all IDs remain unique
  
  - [ ]* 7.6 Write unit tests for TodoList
    - Test addTask() with valid and invalid inputs
    - Test toggleTask() preserves other properties
    - Test deleteTask() removes correct task
    - Test loadTasks() handles corrupted data gracefully
    - _Requirements: 3.2, 3.3, 6.1_

- [ ] 8. Implement QuickLinks class with LocalStorage persistence
  - [x] 8.1 Create QuickLinks class with storage methods
    - Implement constructor(containerElement) with empty links array
    - Implement loadLinks() to retrieve from localStorage.getItem('productivity-links')
    - Implement saveLinks() to persist with localStorage.setItem('productivity-links')
    - Add error handling for corrupted data
    - _Requirements: 4.1, 5.1, 5.2, 6.1_
  
  - [x] 8.2 Implement link management operations
    - Implement addLink(name, url) with validation (non-empty name, valid URL)
    - Validate URL format and auto-prepend 'https://' if missing protocol
    - Generate unique IDs using Date.now() + Math.random()
    - Implement deleteLink(id) to remove link from array
    - Call saveLinks() after every mutation
    - _Requirements: 4.2, 4.3, 10.1_
  
  - [x] 8.3 Implement QuickLinks render method
    - Create link buttons dynamically with name and delete button
    - Add click handlers to open links in new tab (target="_blank" rel="noopener noreferrer")
    - Add event listeners for delete actions
    - Use textContent for user-generated content
    - _Requirements: 4.1, 7.1_
  
  - [ ]* 8.4 Write property test for valid URLs
    - **Property 5: Valid URLs**
    - **Validates: Requirements 4.3**
    - Verify all links in array match URL pattern /^https?:\/\/.+/
  
  - [ ]* 8.5 Write unit tests for QuickLinks
    - Test addLink() with valid and invalid URLs
    - Test URL validation and auto-prepend logic
    - Test deleteLink() removes correct link
    - Test loadLinks() handles corrupted data gracefully
    - _Requirements: 4.2, 4.3, 6.1_

- [x] 9. Checkpoint - Verify data persistence and validation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement main application initialization
  - [x] 10.1 Create initializeApp() function in js/app.js
    - Query all container elements from DOM
    - Instantiate all four module classes (GreetingModule, FocusTimer, TodoList, QuickLinks)
    - Call loadTasks() and loadLinks() to restore persisted data
    - Call render() on all modules to display initial state
    - Set up clock update interval (setInterval every 1000ms)
    - _Requirements: 5.1, 5.2_
  
  - [x] 10.2 Add DOMContentLoaded event listener
    - Wrap initializeApp() in DOMContentLoaded event
    - Add error boundary try-catch for initialization failures
    - Log initialization errors to console
    - _Requirements: 9.1_
  
  - [ ]* 10.3 Write integration tests for complete workflows
    - Test complete task workflow: add → toggle → edit → delete → verify persistence
    - Test timer workflow: start → stop → reset → verify state consistency
    - Test link workflow: add → delete → verify persistence
    - Test page reload: perform operations → reload → verify data restored
    - _Requirements: 5.1, 5.2, 10.2_

- [ ] 11. Implement error handling and edge cases
  - [x] 11.1 Add LocalStorage availability check
    - Implement isLocalStorageAvailable() utility function
    - Test by attempting to write and read a test value
    - Show warning message if LocalStorage is unavailable
    - Gracefully degrade to in-memory storage only
    - _Requirements: 6.1, 6.2_
  
  - [x] 11.2 Add quota exceeded error handling
    - Wrap all localStorage.setItem() calls in try-catch
    - Catch QuotaExceededError specifically
    - Show user-friendly error message when quota exceeded
    - Log error details to console
    - _Requirements: 6.1, 6.2_
  
  - [x] 11.3 Add input validation error messages
    - Display validation errors for empty task text
    - Display validation errors for task text exceeding 200 characters
    - Display validation errors for invalid URLs
    - Clear error messages on successful input
    - _Requirements: 3.3, 4.3_

- [-] 12. Implement security measures
  - [x] 12.1 Audit all DOM manipulation for XSS prevention
    - Verify all user-generated content uses textContent (not innerHTML)
    - Verify no eval() or Function() constructor usage
    - Verify no inline event handlers in HTML
    - Add URL validation to prevent javascript: protocol injection
    - _Requirements: 7.1, 7.2_
  
  - [ ]* 12.2 Write security tests
    - Test XSS prevention with malicious input strings (<script>, onerror, etc.)
    - Test URL validation rejects javascript: protocol
    - Test no code execution from user input
    - _Requirements: 7.1, 7.2_

- [x] 13. Performance optimization
  - [x] 13.1 Optimize rendering performance
    - Use DocumentFragment for batch DOM updates in render methods
    - Implement event delegation for task and link lists
    - Minimize reflows by batching DOM reads and writes
    - _Requirements: 8.1, 8.2_
  
  - [x] 13.2 Optimize timer performance
    - Ensure tick() method completes in <16ms for 60fps
    - Consider requestAnimationFrame for smoother updates if needed
    - Verify only one timer interval runs at a time
    - _Requirements: 8.3_
  
  - [ ]* 13.3 Performance testing
    - Measure initial page load time (target: <100ms)
    - Measure task add/delete operations (target: <50ms)
    - Measure timer tick update (target: <16ms)
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 14. Final integration and polish
  - [x] 14.1 Test cross-browser compatibility
    - Test in Chrome 60+, Firefox 55+, Safari 11+, Edge 79+
    - Verify LocalStorage works in all browsers
    - Verify CSS renders correctly in all browsers
    - Fix any browser-specific issues
    - _Requirements: 9.1_
  
  - [x] 14.2 Test responsive design
    - Test layout on mobile devices (320px width minimum)
    - Test layout on tablets (768px width)
    - Test layout on desktop (1024px+ width)
    - Verify touch interactions work on mobile
    - _Requirements: 9.1_
  
  - [ ]* 14.3 Write property test for idempotent renders
    - **Property 10: Idempotent Renders**
    - **Validates: Requirements 10.2**
    - Generate random states and verify multiple render() calls produce same DOM
  
  - [ ]* 14.4 Write property test for storage round-trip
    - **Property: Storage Round-Trip**
    - **Validates: Requirements 5.1, 5.2**
    - Generate random task/link arrays, verify save→load returns equivalent data

- [x] 15. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- All user-generated content must use textContent to prevent XSS
- LocalStorage keys: 'productivity-tasks' and 'productivity-links'
- Timer duration: 1500 seconds (25 minutes)
- Maximum task text length: 200 characters
- Maximum link name length: 50 characters
- URL validation pattern: /^https?:\/\/.+/
- ID generation: Date.now() + Math.random().toString(36).substr(2, 9)
