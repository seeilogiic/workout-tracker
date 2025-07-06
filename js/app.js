// Local storage keys
const STORAGE_KEYS = {
    SELECTED_WORKOUT: 'selectedWorkout',
    WORKOUT_COUNT: 'workoutCount',
    LAST_WORKOUT: 'lastWorkout',
    LAST_WORKOUT_DATE: 'lastWorkoutDate',
    WORKOUT_HISTORY: 'workoutHistory',
    CURRENT_WORKOUT: 'currentWorkout',
    GITHUB_TOKEN: 'githubToken',
    GIST_ID: 'gistId'
};

// GitHub API configuration
const GITHUB_CONFIG = {
    GIST_FILENAME: 'workout-data.json',
    API_BASE: 'https://api.github.com'
};

// Global state
let currentWorkout = null;
let exerciseCounter = 0;
let workoutStartTime = null;
let currentCalendarDate = new Date();

// Menu Functions
function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

function showSection(sectionName) {
    // Hide all sections first
    document.getElementById('workoutSelection').style.display = 'none';
    document.getElementById('workoutTracking').classList.remove('active');
    document.getElementById('historySection').classList.remove('active');
    document.getElementById('calendarSection').classList.remove('active');
    document.getElementById('weightSection').classList.remove('active');
    document.getElementById('statsSection').classList.remove('active');
    document.getElementById('librarySection').classList.remove('active');
    document.getElementById('syncSection').classList.remove('active');
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked nav item
    document.querySelector(`[onclick="showSection('${sectionName}')"]`).classList.add('active');
    
    // Show the selected section
    switch(sectionName) {
        case 'home':
            document.getElementById('workoutSelection').style.display = 'block';
            break;
        case 'dashboard':
            document.getElementById('statsSection').classList.add('active');
            loadExerciseList();
            break;
        case 'calendar':
            document.getElementById('calendarSection').classList.add('active');
            loadCalendar();
            break;
        case 'weight':
            document.getElementById('weightSection').classList.add('active');
            loadWeightData();
            break;
        case 'settings':
            document.getElementById('syncSection').classList.add('active');
            loadSyncStatus();
            break;
        case 'library':
            document.getElementById('librarySection').classList.add('active');
            loadMuscleSummary();
            break;
    }
    
    // Close menu
    toggleMenu();
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    setupEventListeners();
});

function setupEventListeners() {
    const workoutButtons = document.querySelectorAll('.workout-btn');
    workoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            const workoutType = this.getAttribute('data-workout');
            selectWorkout(workoutType);
        });
    });
}

function selectWorkout(workoutType) {
    // Remove previous selection
    document.querySelectorAll('.workout-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selection to clicked button
    const selectedButton = document.querySelector(`[data-workout="${workoutType}"]`);
    selectedButton.classList.add('selected');

    // Initialize current workout session
    currentWorkout = {
        type: workoutType,
        date: new Date().toISOString(),
        exercises: [],
        id: Date.now()
    };

    // Show workout tracking interface
    showWorkoutTracking(workoutType);
}

function showWorkoutTracking(workoutType) {
    document.getElementById('workoutSelection').style.display = 'none';
    document.getElementById('workoutTracking').classList.add('active');
    document.getElementById('historySection').classList.remove('active');
    
    document.getElementById('currentWorkoutType').textContent = workoutType.charAt(0).toUpperCase() + workoutType.slice(1) + ' Workout';
    document.getElementById('workoutDate').textContent = new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Start workout timer
    workoutStartTime = new Date();
    
    // Hide exercise input and update exercise list
    document.getElementById('exerciseInput').style.display = 'none';
    updateExerciseList();
}

function backToSelection() {
    document.getElementById('workoutTracking').classList.remove('active');
    document.getElementById('historySection').classList.remove('active');
    document.getElementById('statsSection').classList.remove('active');
    document.getElementById('syncSection').classList.remove('active');
    document.getElementById('workoutSelection').style.display = 'block';
    
    // Clear current workout session and reset selection
    currentWorkout = null;
    exerciseCounter = 0;
    
    // Remove any selected workout type
    document.querySelectorAll('.workout-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// Data loading and saving
function loadData() {
    const workoutCount = localStorage.getItem(STORAGE_KEYS.WORKOUT_COUNT) || 0;
    const lastWorkout = localStorage.getItem(STORAGE_KEYS.LAST_WORKOUT);
    const lastWorkoutDate = localStorage.getItem(STORAGE_KEYS.LAST_WORKOUT_DATE);
    
    document.getElementById('workoutCount').textContent = 
        workoutCount > 0 ? `${workoutCount} workouts completed` : 'No workouts recorded yet';
    
    if (lastWorkout && lastWorkoutDate) {
        document.getElementById('lastWorkout').style.display = 'block';
        document.getElementById('lastWorkoutText').textContent = 
            `${lastWorkout} on ${new Date(lastWorkoutDate).toLocaleDateString()}`;
    }
}

function clearData() {
    if (confirm('Are you sure you want to clear all workout data? This cannot be undone.')) {
        localStorage.clear();
        loadData();
        updateExerciseList();
        alert('All data has been cleared.');
    }
}

// Exercise management
function addExercise() {
    document.getElementById('exerciseInput').style.display = 'block';
    document.getElementById('exerciseNameInput').focus();
}

function closeExerciseInput() {
    document.getElementById('exerciseInput').style.display = 'none';
    clearExerciseInput();
}

function clearExerciseInput() {
    document.getElementById('exerciseNameInput').value = '';
    document.getElementById('exerciseWeightTypeInput').value = '';
    document.getElementById('exerciseSetsInput').value = '3';
    document.getElementById('exerciseRepsInput').value = '10';
    document.getElementById('exerciseWeightInput').value = '';
    document.getElementById('exerciseCommentsInput').value = '';
    document.getElementById('exerciseSuggestions').style.display = 'none';
    document.getElementById('previousExerciseInfo').style.display = 'none';
}

function saveExercise() {
    const name = document.getElementById('exerciseNameInput').value.trim();
    const weightType = document.getElementById('exerciseWeightTypeInput').value.trim();
    const sets = parseInt(document.getElementById('exerciseSetsInput').value);
    const reps = parseInt(document.getElementById('exerciseRepsInput').value);
    const weight = parseFloat(document.getElementById('exerciseWeightInput').value) || 0;
    const comments = document.getElementById('exerciseCommentsInput').value.trim();
    
    if (!name) {
        alert('Please enter an exercise name.');
        return;
    }
    
    if (!currentWorkout) {
        alert('No workout session active. Please select a workout type first.');
        return;
    }
    
    const exercise = {
        id: ++exerciseCounter,
        name: name,
        weightType: weightType,
        sets: sets,
        reps: reps,
        weight: weight,
        comments: comments,
        timestamp: new Date().toISOString()
    };
    
    currentWorkout.exercises.push(exercise);
    
    closeExerciseInput();
    updateExerciseList();
}

function updateExerciseList() {
    const exercisesList = document.getElementById('exercisesList');
    
    if (!currentWorkout || currentWorkout.exercises.length === 0) {
        exercisesList.innerHTML = '<p style="text-align: center; color: #94a3b8;">No exercises added yet.</p>';
        return;
    }
    
    const exercisesHTML = currentWorkout.exercises.map(exercise => {
        const details = [];
        if (exercise.sets) details.push(`${exercise.sets} sets`);
        if (exercise.reps) details.push(`${exercise.reps} reps`);
        if (exercise.weight) details.push(`${exercise.weight} lbs`);
        if (exercise.weightType) details.push(exercise.weightType);
        
        const detailsText = details.length > 0 ? details.join(' • ') : 'No details';
        
        return `
            <div class="exercise-item">
                <div class="exercise-info">
                    <div class="exercise-name">${exercise.name}</div>
                    <div class="exercise-details">${detailsText}</div>
                    ${exercise.comments ? `<div class="exercise-comments">${exercise.comments}</div>` : ''}
                </div>
                <div class="exercise-actions">
                    <button class="edit-exercise-btn" onclick="editExercise(${exercise.id})">✏️</button>
                    <button class="delete-exercise-btn" onclick="deleteExercise(${exercise.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
    
    exercisesList.innerHTML = exercisesHTML;
}

function deleteExercise(exerciseId) {
    if (confirm('Are you sure you want to delete this exercise?')) {
        currentWorkout.exercises = currentWorkout.exercises.filter(ex => ex.id !== exerciseId);
        updateExerciseList();
    }
}

function saveWorkout() {
    if (!currentWorkout || currentWorkout.exercises.length === 0) {
        alert('Please add at least one exercise before saving the workout.');
        return;
    }
    
    // Calculate workout duration
    if (workoutStartTime) {
        const duration = Math.round((new Date() - workoutStartTime) / 60000);
        currentWorkout.duration = duration;
    }
    
    // Save to history
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    history.push(currentWorkout);
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
    
    // Update stats
    const workoutCount = parseInt(localStorage.getItem(STORAGE_KEYS.WORKOUT_COUNT) || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.WORKOUT_COUNT, workoutCount.toString());
    localStorage.setItem(STORAGE_KEYS.LAST_WORKOUT, currentWorkout.type);
    localStorage.setItem(STORAGE_KEYS.LAST_WORKOUT_DATE, currentWorkout.date);
    
    // Reset and go back to selection
    currentWorkout = null;
    exerciseCounter = 0;
    workoutStartTime = null;
    
    alert('Workout saved successfully!');
    backToSelection();
    loadData();
}

// Exercise suggestions and previous exercise loading
function showExerciseSuggestions() {
    const input = document.getElementById('exerciseNameInput');
    const suggestions = document.getElementById('exerciseSuggestions');
    const query = input.value.toLowerCase();
    
    if (query.length < 2) {
        suggestions.style.display = 'none';
        return;
    }
    
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const exerciseNames = new Set();
    
    history.forEach(workout => {
        workout.exercises.forEach(exercise => {
            if (exercise.name && exercise.name.toLowerCase().includes(query)) {
                exerciseNames.add(exercise.name);
            }
        });
    });
    
    if (exerciseNames.size > 0) {
        const suggestionsHTML = Array.from(exerciseNames).slice(0, 5).map(name => 
            `<div class="exercise-suggestion" onclick="selectExerciseSuggestion('${name}')">${name}</div>`
        ).join('');
        
        suggestions.innerHTML = suggestionsHTML;
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}

function selectExerciseSuggestion(name) {
    document.getElementById('exerciseNameInput').value = name;
    document.getElementById('exerciseSuggestions').style.display = 'none';
    loadPreviousExercise();
}

function loadPreviousExercise() {
    const exerciseName = document.getElementById('exerciseNameInput').value.trim();
    const weightType = document.getElementById('exerciseWeightTypeInput').value.trim();
    
    if (!exerciseName) {
        document.getElementById('previousExerciseInfo').style.display = 'none';
        return;
    }
    
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const previousExercises = [];
    
    history.forEach(workout => {
        workout.exercises.forEach(exercise => {
            if (exercise.name && exercise.name.toLowerCase() === exerciseName.toLowerCase()) {
                if (!weightType || !exercise.weightType || exercise.weightType.toLowerCase() === weightType.toLowerCase()) {
                    previousExercises.push({
                        ...exercise,
                        workoutDate: workout.date,
                        workoutType: workout.type
                    });
                }
            }
        });
    });
    
    if (previousExercises.length > 0) {
        const latest = previousExercises[previousExercises.length - 1];
        const workoutDate = new Date(latest.workoutDate);
        
        let detailsHTML = `
            <strong>${latest.workoutType} Workout</strong> on ${workoutDate.toLocaleDateString()}<br>
        `;
        
        if (latest.sets) detailsHTML += `${latest.sets} sets • `;
        if (latest.reps) detailsHTML += `${latest.reps} reps • `;
        if (latest.weight) detailsHTML += `${latest.weight} lbs • `;
        if (latest.weightType) detailsHTML += `${latest.weightType}`;
        
        if (latest.comments) {
            detailsHTML += `<br><em>"${latest.comments}"</em>`;
        }
        
        document.getElementById('previousExerciseDetails').innerHTML = detailsHTML;
        document.getElementById('previousExerciseInfo').style.display = 'block';
    } else {
        document.getElementById('previousExerciseInfo').style.display = 'none';
    }
} 