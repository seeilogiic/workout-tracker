// Exercise Library Functions
const exerciseDatabase = {
    chest: [
        { name: 'Bench Press', target: 'Upper chest, anterior deltoids', areas: ['upper_chest', 'anterior_deltoids'] },
        { name: 'Incline Bench Press', target: 'Upper chest', areas: ['upper_chest'] },
        { name: 'Decline Bench Press', target: 'Lower chest', areas: ['lower_chest'] },
        { name: 'Dumbbell Flyes', target: 'Chest isolation', areas: ['chest_isolation'] },
        { name: 'Push-ups', target: 'Chest, triceps, shoulders', areas: ['chest', 'triceps', 'shoulders'] },
        { name: 'Cable Flyes', target: 'Chest isolation', areas: ['chest_isolation'] },
        { name: 'Dips', target: 'Lower chest, triceps', areas: ['lower_chest', 'triceps'] }
    ],
    back: [
        { name: 'Pull-ups', target: 'Upper back, lats', areas: ['upper_back', 'lats'] },
        { name: 'Deadlift', target: 'Entire back, hamstrings', areas: ['entire_back', 'hamstrings'] },
        { name: 'Barbell Rows', target: 'Middle back, lats', areas: ['middle_back', 'lats'] },
        { name: 'Lat Pulldowns', target: 'Lats, upper back', areas: ['lats', 'upper_back'] },
        { name: 'T-Bar Rows', target: 'Middle back', areas: ['middle_back'] },
        { name: 'Face Pulls', target: 'Rear deltoids, upper back', areas: ['rear_deltoids', 'upper_back'] },
        { name: 'Seated Cable Rows', target: 'Middle back, lats', areas: ['middle_back', 'lats'] }
    ],
    shoulders: [
        { name: 'Overhead Press', target: 'Anterior deltoids', areas: ['anterior_deltoids'] },
        { name: 'Lateral Raises', target: 'Lateral deltoids', areas: ['lateral_deltoids'] },
        { name: 'Rear Delt Flyes', target: 'Posterior deltoids', areas: ['posterior_deltoids'] },
        { name: 'Arnold Press', target: 'All deltoid heads', areas: ['anterior_deltoids', 'lateral_deltoids', 'posterior_deltoids'] },
        { name: 'Upright Rows', target: 'Lateral deltoids, traps', areas: ['lateral_deltoids', 'traps'] },
        { name: 'Shrugs', target: 'Trapezius', areas: ['traps'] }
    ],
    biceps: [
        { name: 'Barbell Curls', target: 'Biceps brachii', areas: ['biceps_brachii'] },
        { name: 'Dumbbell Curls', target: 'Biceps brachii', areas: ['biceps_brachii'] },
        { name: 'Hammer Curls', target: 'Brachialis, forearms', areas: ['brachialis', 'forearms'] },
        { name: 'Preacher Curls', target: 'Lower biceps', areas: ['lower_biceps'] },
        { name: 'Concentration Curls', target: 'Biceps isolation', areas: ['biceps_isolation'] },
        { name: 'Cable Curls', target: 'Biceps brachii', areas: ['biceps_brachii'] }
    ],
    triceps: [
        { name: 'Tricep Dips', target: 'All tricep heads', areas: ['long_head_triceps', 'lateral_head_triceps', 'medial_head_triceps'] },
        { name: 'Skull Crushers', target: 'Long head triceps', areas: ['long_head_triceps'] },
        { name: 'Tricep Pushdowns', target: 'Lateral head triceps', areas: ['lateral_head_triceps'] },
        { name: 'Overhead Extensions', target: 'Long head triceps', areas: ['long_head_triceps'] },
        { name: 'Diamond Push-ups', target: 'All tricep heads', areas: ['long_head_triceps', 'lateral_head_triceps', 'medial_head_triceps'] },
        { name: 'Rope Extensions', target: 'All tricep heads', areas: ['long_head_triceps', 'lateral_head_triceps', 'medial_head_triceps'] }
    ],
    forearms: [
        { name: 'Wrist Curls', target: 'Flexor muscles', areas: ['flexor_muscles'] },
        { name: 'Reverse Wrist Curls', target: 'Extensor muscles', areas: ['extensor_muscles'] },
        { name: 'Farmer\'s Walks', target: 'Grip strength', areas: ['grip_strength'] },
        { name: 'Plate Pinches', target: 'Grip strength', areas: ['grip_strength'] }
    ],
    abs: [
        { name: 'Crunches', target: 'Rectus abdominis', areas: ['rectus_abdominis'] },
        { name: 'Planks', target: 'Core stability', areas: ['core_stability'] },
        { name: 'Russian Twists', target: 'Obliques', areas: ['obliques'] },
        { name: 'Leg Raises', target: 'Lower abs', areas: ['lower_abs'] },
        { name: 'Mountain Climbers', target: 'Core, cardio', areas: ['core', 'cardio'] },
        { name: 'Ab Wheel Rollouts', target: 'Full core', areas: ['full_core'] }
    ],
    legs: [
        { name: 'Squats', target: 'Quadriceps, glutes', areas: ['quadriceps', 'glutes'] },
        { name: 'Deadlifts', target: 'Hamstrings, glutes, back', areas: ['hamstrings', 'glutes', 'back'] },
        { name: 'Leg Press', target: 'Quadriceps', areas: ['quadriceps'] },
        { name: 'Lunges', target: 'Quadriceps, glutes', areas: ['quadriceps', 'glutes'] },
        { name: 'Leg Extensions', target: 'Quadriceps isolation', areas: ['quadriceps_isolation'] },
        { name: 'Leg Curls', target: 'Hamstrings isolation', areas: ['hamstrings_isolation'] },
        { name: 'Romanian Deadlifts', target: 'Hamstrings, glutes', areas: ['hamstrings', 'glutes'] }
    ],
    glutes: [
        { name: 'Hip Thrusts', target: 'Gluteus maximus', areas: ['gluteus_maximus'] },
        { name: 'Glute Bridges', target: 'Gluteus maximus', areas: ['gluteus_maximus'] },
        { name: 'Donkey Kicks', target: 'Gluteus maximus', areas: ['gluteus_maximus'] },
        { name: 'Fire Hydrants', target: 'Gluteus medius', areas: ['gluteus_medius'] },
        { name: 'Clamshells', target: 'Gluteus medius', areas: ['gluteus_medius'] }
    ],
    calves: [
        { name: 'Standing Calf Raises', target: 'Gastrocnemius', areas: ['gastrocnemius'] },
        { name: 'Seated Calf Raises', target: 'Soleus', areas: ['soleus'] },
        { name: 'Donkey Calf Raises', target: 'Gastrocnemius', areas: ['gastrocnemius'] }
    ]
};

function loadMuscleGroupExercises() {
    const muscleGroup = document.getElementById('muscleGroupSelect').value;
    const libraryContainer = document.getElementById('exerciseLibrary');
    
    if (!muscleGroup) {
        libraryContainer.innerHTML = `
            <div class="library-intro">
                <h3>Exercise Recommendations</h3>
                <p>Select a muscle group to see recommended exercises and their target areas.</p>
            </div>
        `;
        return;
    }
    
    const exercises = exerciseDatabase[muscleGroup];
    if (!exercises) {
        libraryContainer.innerHTML = '<p style="text-align: center; color: #94a3b8;">No exercises found for this muscle group.</p>';
        return;
    }
    
    const exercisesHTML = exercises.map(exercise => `
        <div class="exercise-item">
            <div class="exercise-name">${exercise.name}</div>
            <div class="exercise-target">Targets: ${exercise.target}</div>
        </div>
    `).join('');
    
    libraryContainer.innerHTML = `
        <div class="exercise-category">
            <h4>${muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1)} Exercises</h4>
            <div class="exercise-list">
                ${exercisesHTML}
            </div>
        </div>
    `;
}

function loadMuscleSummary() {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const muscleGroups = Object.keys(exerciseDatabase);
    const summaryContainer = document.getElementById('muscleSummary');
    
    const muscleStatus = {};
    muscleGroups.forEach(muscle => {
        muscleStatus[muscle] = { lastWorkout: null, status: 'none' };
    });
    
    // Check last workout for each muscle group
    history.forEach(workout => {
        workout.exercises.forEach(exercise => {
            const exerciseName = exercise.name.toLowerCase();
            muscleGroups.forEach(muscle => {
                if (exerciseDatabase[muscle].some(ex => ex.name.toLowerCase().includes(exerciseName) || exerciseName.includes(ex.name.toLowerCase()))) {
                    const workoutDate = new Date(workout.date);
                    if (!muscleStatus[muscle].lastWorkout || workoutDate > muscleStatus[muscle].lastWorkout) {
                        muscleStatus[muscle].lastWorkout = workoutDate;
                    }
                }
            });
        });
    });
    
    // Determine status for each muscle group
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    Object.keys(muscleStatus).forEach(muscle => {
        const lastWorkout = muscleStatus[muscle].lastWorkout;
        if (!lastWorkout) {
            muscleStatus[muscle].status = 'none';
        } else if (lastWorkout > oneWeekAgo) {
            muscleStatus[muscle].status = 'recent';
        } else if (lastWorkout > oneMonthAgo) {
            muscleStatus[muscle].status = 'old';
        } else {
            muscleStatus[muscle].status = 'none';
        }
    });
    
    const summaryHTML = Object.keys(muscleStatus).map(muscle => {
        const status = muscleStatus[muscle].status;
        const statusText = status === 'recent' ? 'Recent' : status === 'old' ? 'Old' : 'None';
        
        return `
            <div class="muscle-summary-item">
                <div class="muscle-summary-name">${muscle.charAt(0).toUpperCase() + muscle.slice(1)}</div>
                <div class="muscle-summary-status ${status}">${statusText}</div>
            </div>
        `;
    }).join('');
    
    summaryContainer.innerHTML = summaryHTML;
}

function loadDayMuscleSummary(year, month, day) {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const targetDate = new Date(year, month - 1, day);
    const summaryContainer = document.getElementById('dayMuscleSummary');
    
    if (!summaryContainer) return;
    
    // Get workouts for this specific day
    const dayWorkouts = history.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.getFullYear() === year && 
               workoutDate.getMonth() === month - 1 && 
               workoutDate.getDate() === day;
    });
    
    if (dayWorkouts.length === 0) {
        summaryContainer.innerHTML = '<p class="no-muscle-data">No workout data for this day</p>';
        return;
    }
    
    // Track muscle areas worked on this day
    const workedAreas = new Set();
    const workedMuscles = new Set();
    
    dayWorkouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
            const exerciseName = exercise.name || '';
            const normalizedName = normalizeExerciseName(exerciseName);
            
            // Find which muscle group and areas this exercise targets
            for (const [muscleGroup, exercises] of Object.entries(exerciseDatabase)) {
                const found = exercises.find(ex => 
                    normalizeExerciseName(ex.name) === normalizedName
                );
                if (found) {
                    workedMuscles.add(muscleGroup);
                    if (found.areas) {
                        found.areas.forEach(area => workedAreas.add(area));
                    }
                    break;
                }
            }
        });
    });
    
    // Define muscle group areas for recommendations
    const muscleGroupAreas = {
        chest: ['upper_chest', 'lower_chest', 'chest_isolation'],
        back: ['upper_back', 'middle_back', 'lats', 'entire_back'],
        shoulders: ['anterior_deltoids', 'lateral_deltoids', 'posterior_deltoids', 'traps'],
        biceps: ['biceps_brachii', 'brachialis', 'lower_biceps', 'biceps_isolation'],
        triceps: ['long_head_triceps', 'lateral_head_triceps', 'medial_head_triceps'],
        legs: ['quadriceps', 'quadriceps_isolation', 'hamstrings', 'hamstrings_isolation'],
        glutes: ['gluteus_maximus', 'gluteus_medius'],
        calves: ['gastrocnemius', 'soleus'],
        abs: ['rectus_abdominis', 'lower_abs', 'obliques', 'core_stability', 'full_core'],
        forearms: ['flexor_muscles', 'extensor_muscles', 'grip_strength']
    };
    
    // Generate summary and recommendations
    let summaryHTML = '<div class="day-muscle-summary">';
    
    // Show worked muscles
    if (workedMuscles.size > 0) {
        summaryHTML += '<div class="worked-muscles">';
        summaryHTML += '<h5>Muscles Worked:</h5>';
        summaryHTML += '<div class="muscle-tags">';
        Array.from(workedMuscles).forEach(muscle => {
            summaryHTML += `<span class="muscle-tag worked">${muscle.charAt(0).toUpperCase() + muscle.slice(1)}</span>`;
        });
        summaryHTML += '</div></div>';
    }
    
    // Check for missing areas and provide recommendations
    const missingAreas = [];
    const recommendations = [];
    
    Object.entries(muscleGroupAreas).forEach(([muscleGroup, areas]) => {
        if (workedMuscles.has(muscleGroup)) {
            const missingInGroup = areas.filter(area => !workedAreas.has(area));
            if (missingInGroup.length > 0) {
                missingAreas.push(`${muscleGroup}: ${missingInGroup.join(', ')}`);
                
                // Find exercises that target missing areas
                const groupExercises = exerciseDatabase[muscleGroup] || [];
                const recommendedExercises = groupExercises.filter(exercise => 
                    exercise.areas && exercise.areas.some(area => missingInGroup.includes(area))
                );
                
                if (recommendedExercises.length > 0) {
                    recommendations.push({
                        muscleGroup,
                        missingAreas: missingInGroup,
                        exercises: recommendedExercises.slice(0, 2) // Limit to 2 recommendations
                    });
                }
            }
        }
    });
    
    // Show recommendations if any
    if (recommendations.length > 0) {
        summaryHTML += '<div class="muscle-recommendations">';
        summaryHTML += '<h5>Consider Adding:</h5>';
        recommendations.forEach(rec => {
            summaryHTML += `<div class="recommendation-group">`;
            summaryHTML += `<div class="recommendation-muscle">${rec.muscleGroup.charAt(0).toUpperCase() + rec.muscleGroup.slice(1)}</div>`;
            summaryHTML += `<div class="recommendation-exercises">`;
            rec.exercises.forEach(exercise => {
                summaryHTML += `<span class="exercise-recommendation">${exercise.name}</span>`;
            });
            summaryHTML += `</div></div>`;
        });
        summaryHTML += '</div>';
    }
    
    summaryHTML += '</div>';
    summaryContainer.innerHTML = summaryHTML;
} 