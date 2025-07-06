// Calendar Functions
function loadCalendar() {
    updateCalendarDisplay();
    renderCalendar();
}

function updateCalendarDisplay() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthYear = `${monthNames[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`;
    document.getElementById('currentMonthYear').textContent = monthYear;
}

function previousMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    updateCalendarDisplay();
    renderCalendar();
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    updateCalendarDisplay();
    renderCalendar();
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Get workout data
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const workoutDates = new Set();
    history.forEach(workout => {
        const workoutDate = new Date(workout.date);
        if (workoutDate.getFullYear() === year && workoutDate.getMonth() === month) {
            workoutDates.add(workoutDate.getDate());
        }
    });
    
    // Get notes data
    const notes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
    
    let calendarHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += '<div class="calendar-day other-month"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === new Date().toDateString();
        const hasWorkout = workoutDates.has(day);
        const hasNote = notes[`${year}-${month + 1}-${day}`];
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (hasWorkout && hasNote) dayClass += ' has-both';
        else if (hasWorkout) dayClass += ' has-workout';
        else if (hasNote) dayClass += ' has-note';
        
        let dotsHTML = '';
        if (hasWorkout) {
            dotsHTML += '<div class="calendar-day-dot workout-dot"></div>';
        }
        if (hasNote) {
            dotsHTML += '<div class="calendar-day-dot note-dot"></div>';
        }
        
        calendarHTML += `
            <div class="${dayClass}" onclick="showDayDetails(${year}, ${month + 1}, ${day})">
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-day-dots">${dotsHTML}</div>
            </div>
        `;
    }
    
    calendarDays.innerHTML = calendarHTML;
}

function showDayDetails(year, month, day) {
    const dateKey = `${year}-${month}-${day}`;
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const notes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
    
    const dayWorkouts = history.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workoutDate.getFullYear() === year && 
               workoutDate.getMonth() === month - 1 && 
               workoutDate.getDate() === day;
    });
    
    const dayNote = notes[dateKey];
    
    let detailsHTML = `
        <div class="day-details-modal">
            <div class="day-details-header">
                <h3>${month}/${day}/${year}</h3>
                <button class="close-day-details" onclick="closeDayDetails()">×</button>
            </div>
            <div class="day-details-content">
    `;
    
    if (dayWorkouts.length > 0) {
        detailsHTML += '<div class="day-workouts">';
        dayWorkouts.forEach(workout => {
            const workoutDate = new Date(workout.date);
            const formattedTime = workoutDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const durationText = workout.duration ? ` • ${workout.duration} min` : '';
            
            const exercisesHTML = workout.exercises.map(exercise => {
                const exerciseName = exercise.name || 'Unnamed Exercise';
                const exerciseDetails = [];
                
                if (exercise.sets) exerciseDetails.push(`${exercise.sets} sets`);
                if (exercise.reps) exerciseDetails.push(`${exercise.reps} reps`);
                if (exercise.weight) exerciseDetails.push(`${exercise.weight} lbs`);
                if (exercise.weightType) exerciseDetails.push(exercise.weightType);
                
                const detailsText = exerciseDetails.length > 0 ? exerciseDetails.join(' • ') : 'No details';
                
                return `
                    <div class="exercise-summary">
                        <div class="exercise-summary-name">${exerciseName}</div>
                        <div class="exercise-summary-details">${detailsText}</div>
                    </div>
                `;
            }).join('');
            
            detailsHTML += `
                <div class="workout-history-item">
                    <div class="workout-history-header">
                        <div class="workout-history-date">${formattedTime}${durationText}</div>
                        <div class="workout-history-type">${workout.type}</div>
                    </div>
                    <div class="workout-history-exercises">
                        ${exercisesHTML}
                    </div>
                </div>
            `;
        });
        detailsHTML += '</div>';
    }
    
    if (dayNote) {
        detailsHTML += `
            <div class="day-note">
                <h4>Note/Goal:</h4>
                <p>${dayNote}</p>
            </div>
        `;
    }
    
    if (dayWorkouts.length === 0 && !dayNote) {
        detailsHTML += '<p class="no-activities">No activities recorded for this day.</p>';
    }
    
    detailsHTML += `
                <div class="muscle-summary-section">
                    <h4>Muscle Group Summary</h4>
                    <div id="dayMuscleSummary" class="muscle-summary-grid"></div>
                </div>
                <div class="day-actions">
                    <button class="add-note-day-btn" onclick="addNoteForDay(${year}, ${month}, ${day})">Add Note</button>
                </div>
            </div>
        </div>
    `;
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'day-details-overlay';
    modalOverlay.innerHTML = detailsHTML;
    modalOverlay.onclick = function(e) {
        if (e.target === modalOverlay) {
            closeDayDetails();
        }
    };
    
    document.body.appendChild(modalOverlay);
    
    // Load muscle summary for this day
    loadDayMuscleSummary(year, month, day);
}

function closeDayDetails() {
    const overlay = document.querySelector('.day-details-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function addNoteForDay(year, month, day) {
    const note = prompt(`Add a note or goal for ${month}/${day}/${year}:`);
    if (note !== null && note.trim() !== '') {
        const dateKey = `${year}-${month}-${day}`;
        const notes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
        notes[dateKey] = note.trim();
        localStorage.setItem('calendarNotes', JSON.stringify(notes));
        
        // Refresh calendar and close details
        renderCalendar();
        closeDayDetails();
    }
} 