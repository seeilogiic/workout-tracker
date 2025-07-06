// Statistics and Weight Tracking Functions

// 1RM calculation using Brzycki formula
function calculate1RM(weight, reps) {
    if (reps === 1) return weight;
    return weight * (36 / (37 - reps));
}

// Normalize exercise name (remove 's' at end and convert to lowercase for comparison)
function normalizeExerciseName(name) {
    return name.toLowerCase().replace(/s$/, '');
}

// Load list of all exercises for dropdown
function loadExerciseList() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const exerciseMap = new Map(); // normalized name -> original names
    
    history.forEach(workout => {
        workout.exercises.forEach(exercise => {
            if (exercise.name) {
                const normalizedName = normalizeExerciseName(exercise.name);
                if (!exerciseMap.has(normalizedName)) {
                    exerciseMap.set(normalizedName, []);
                }
                exerciseMap.get(normalizedName).push(exercise.name);
            }
        });
    });
    
    const exerciseSelect = document.getElementById('exerciseSelect');
    exerciseSelect.innerHTML = '<option value="">Select an exercise...</option>';
    
    exerciseMap.forEach((originalNames, normalizedName) => {
        const displayName = originalNames[0]; // Use first occurrence
        exerciseSelect.innerHTML += `<option value="${displayName}">${displayName}</option>`;
    });
    
    exerciseSelect.addEventListener('change', function() {
        if (this.value) {
            loadExerciseStats(this.value);
        } else {
            document.getElementById('exerciseStats').innerHTML = '<p style="text-align: center; color: #94a3b8;">Select an exercise to view statistics.</p>';
        }
    });
}

function loadExerciseStats(exerciseName) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const normalizedName = normalizeExerciseName(exerciseName);
    const exerciseData = [];
    
    history.forEach(workout => {
        workout.exercises.forEach(exercise => {
            if (exercise.name && normalizeExerciseName(exercise.name) === normalizedName) {
                exerciseData.push({
                    ...exercise,
                    workoutDate: workout.date,
                    workoutType: workout.type
                });
            }
        });
    });
    
    if (exerciseData.length === 0) {
        document.getElementById('exerciseStats').innerHTML = '<p style="text-align: center; color: #94a3b8;">No data found for this exercise.</p>';
        return;
    }
    
    // Sort by date (newest first)
    exerciseData.sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate));
    
    // Calculate statistics
    const stats = calculateExerciseStats(exerciseData);
    
    // Generate stats HTML
    const statsHTML = `
        <div class="exercise-stats">
            <h3>${exerciseName} Statistics</h3>
            
            <div class="stat-row">
                <span class="stat-label">Total Sessions:</span>
                <span class="stat-value">${stats.totalSessions}</span>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Best Weight:</span>
                <span class="stat-value">${stats.bestWeight} lbs</span>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Estimated 1RM:</span>
                <span class="stat-value">${stats.estimated1RM} lbs</span>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Average Weight:</span>
                <span class="stat-value">${stats.averageWeight} lbs</span>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Progress (Last 5 sessions):</span>
                <span class="stat-value">${stats.progressPercentage}%</span>
            </div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(stats.progressPercentage, 100)}%"></div>
            </div>
            
            <div class="stat-row">
                <span class="stat-label">Last Workout:</span>
                <span class="stat-value">${stats.lastWorkout}</span>
            </div>
        </div>
    `;
    
    document.getElementById('exerciseStats').innerHTML = statsHTML;
}

function calculateExerciseStats(exerciseData) {
    const weights = exerciseData.filter(d => d.weight > 0).map(d => d.weight);
    const bestWeight = weights.length > 0 ? Math.max(...weights) : 0;
    const averageWeight = weights.length > 0 ? (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1) : 0;
    
    // Calculate estimated 1RM from best performance
    let estimated1RM = 0;
    if (weights.length > 0) {
        const bestSession = exerciseData.find(d => d.weight === bestWeight);
        if (bestSession && bestSession.reps) {
            estimated1RM = Math.round(calculate1RM(bestSession.weight, bestSession.reps));
        }
    }
    
    // Calculate progress (comparing last 5 sessions to previous 5)
    let progressPercentage = 0;
    if (exerciseData.length >= 10) {
        const recent5 = exerciseData.slice(0, 5).filter(d => d.weight > 0);
        const previous5 = exerciseData.slice(5, 10).filter(d => d.weight > 0);
        
        if (recent5.length > 0 && previous5.length > 0) {
            const recentAvg = recent5.reduce((a, b) => a + b.weight, 0) / recent5.length;
            const previousAvg = previous5.reduce((a, b) => a + b.weight, 0) / previous5.length;
            
            if (previousAvg > 0) {
                progressPercentage = Math.round(((recentAvg - previousAvg) / previousAvg) * 100);
            }
        }
    }
    
    const lastWorkout = exerciseData.length > 0 ? 
        new Date(exerciseData[0].workoutDate).toLocaleDateString() : 'Never';
    
    return {
        totalSessions: exerciseData.length,
        bestWeight: bestWeight,
        estimated1RM: estimated1RM,
        averageWeight: averageWeight,
        progressPercentage: progressPercentage,
        lastWorkout: lastWorkout
    };
}

// Weight Tracking Functions
function loadWeightData() {
    const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
    const weightContainer = document.getElementById('weightHistory');
    
    if (weightHistory.length === 0) {
        weightContainer.innerHTML = '<p style="text-align: center; color: #94a3b8;">No weight data recorded yet.</p>';
        return;
    }
    
    // Sort by date (newest first)
    weightHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const weightHTML = weightHistory.map(entry => `
        <div class="weight-entry">
            <div class="weight-date">${new Date(entry.date).toLocaleDateString()}</div>
            <div class="weight-value">${entry.weight} lbs</div>
        </div>
    `).join('');
    
    weightContainer.innerHTML = weightHTML;
}

function addWeight() {
    const weightInput = document.getElementById('weightInput');
    const weight = parseFloat(weightInput.value);
    
    if (!weight || weight <= 0) {
        alert('Please enter a valid weight.');
        return;
    }
    
    const weightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
    weightHistory.push({
        weight: weight,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
    
    weightInput.value = '';
    loadWeightData();
    alert('Weight recorded successfully!');
}

// History Functions
function showHistory() {
    document.getElementById('workoutSelection').style.display = 'none';
    document.getElementById('workoutTracking').classList.remove('active');
    document.getElementById('historySection').classList.add('active');
    document.getElementById('statsSection').classList.remove('active');
    
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const historyContainer = document.getElementById('historyContainer');
    
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="no-history">
                <h3>No workouts yet</h3>
                <p>Complete your first workout to see it here!</p>
            </div>
        `;
        return;
    }

    // Sort history by date (newest first)
    history.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const historyHTML = history.map(workout => {
        const workoutDate = new Date(workout.date);
        const formattedDate = workoutDate.toLocaleDateString() + ' at ' + workoutDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const exercisesHTML = workout.exercises.map(exercise => {
            const exerciseName = exercise.name || 'Unnamed Exercise';
            const exerciseDetails = [];
            
            if (exercise.sets) exerciseDetails.push(`${exercise.sets} sets`);
            if (exercise.reps) exerciseDetails.push(`${exercise.reps} reps`);
            if (exercise.weight) exerciseDetails.push(`${exercise.weight} lbs`);
            
            const detailsText = exerciseDetails.length > 0 ? exerciseDetails.join(' • ') : 'No details';
            
            return `
                <div class="exercise-summary">
                    <div class="exercise-summary-name">${exerciseName}</div>
                    <div class="exercise-summary-details">${detailsText}</div>
                </div>
            `;
        }).join('');
        
        const durationText = workout.duration ? ` • ${workout.duration} min` : '';
        
        return `
            <div class="workout-history-item">
                <div class="workout-history-header">
                    <div class="workout-history-date">${formattedDate}${durationText}</div>
                    <div class="workout-history-type">${workout.type}</div>
                </div>
                <div class="workout-history-exercises">
                    ${exercisesHTML}
                </div>
            </div>
        `;
    }).join('');
    
    historyContainer.innerHTML = historyHTML;
}

function showStats() {
    document.getElementById('workoutSelection').style.display = 'none';
    document.getElementById('workoutTracking').classList.remove('active');
    document.getElementById('historySection').classList.remove('active');
    document.getElementById('statsSection').classList.add('active');
    document.getElementById('syncSection').classList.remove('active');
    
    loadExerciseList();
} 