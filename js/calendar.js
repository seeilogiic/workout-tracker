// Calendar Functions
let currentWeekStart = new Date();
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay()); // Start of current week (Sunday)

function loadCalendar() {
    updateCalendarDisplay();
    renderCalendar();
}

function updateCalendarDisplay() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    let displayText = '';
    if (currentWeekStart.getMonth() === weekEnd.getMonth()) {
        displayText = `${monthNames[currentWeekStart.getMonth()]} ${currentWeekStart.getDate()} - ${weekEnd.getDate()}, ${currentWeekStart.getFullYear()}`;
    } else if (currentWeekStart.getFullYear() === weekEnd.getFullYear()) {
        displayText = `${monthNames[currentWeekStart.getMonth()]} ${currentWeekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${currentWeekStart.getFullYear()}`;
    } else {
        displayText = `${monthNames[currentWeekStart.getMonth()]} ${currentWeekStart.getDate()}, ${currentWeekStart.getFullYear()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;
    }
    
    document.getElementById('currentMonthYear').textContent = displayText;
}

function previousWeek() {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    updateCalendarDisplay();
    renderCalendar();
}

function nextWeek() {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    updateCalendarDisplay();
    renderCalendar();
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Get workout data
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const notes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
    
    let calendarHTML = '';
    
    // Add weekday headers
    calendarHTML += '<div class="calendar-week-header">';
    weekdays.forEach(day => {
        calendarHTML += `<div class="weekday-header">${day}</div>`;
    });
    calendarHTML += '</div>';
    
    // Add week days
    calendarHTML += '<div class="calendar-week-days">';
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(currentWeekStart);
        currentDate.setDate(currentWeekStart.getDate() + i);
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const dateKey = `${year}-${month}-${day}`;
        
        const isToday = currentDate.toDateString() === new Date().toDateString();
        const isOtherMonth = currentDate.getMonth() !== currentWeekStart.getMonth();
        
        // Get workouts for this day
        const dayWorkouts = history.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate.getFullYear() === year && 
                   workoutDate.getMonth() === month - 1 && 
                   workoutDate.getDate() === day;
        });
        
        const dayNote = notes[dateKey];
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' today';
        if (isOtherMonth) dayClass += ' other-month';
        
        calendarHTML += `
            <div class="${dayClass}" onclick="showDayDetails(${year}, ${month}, ${day})">
                <div class="calendar-day-header">
                    <div class="calendar-day-number">${day}</div>
                    <div class="calendar-day-indicators">
                        ${dayWorkouts.length > 0 ? '<div class="workout-indicator">W</div>' : ''}
                        ${dayNote ? '<div class="note-indicator">N</div>' : ''}
                    </div>
                </div>
                <div class="calendar-day-content">
                    ${dayNote ? `
                        <div class="day-note-bubble">
                            <div class="note-bubble-icon">📝</div>
                            <div class="note-bubble-text">${dayNote.length > 30 ? dayNote.substring(0, 30) + '...' : dayNote}</div>
                        </div>
                    ` : ''}
                    ${dayWorkouts.length > 0 ? `
                        <div class="day-workout-bubble">
                            <div class="workout-bubble-icon">💪</div>
                            <div class="workout-bubble-text">${dayWorkouts[0].type}${dayWorkouts.length > 1 ? ` +${dayWorkouts.length - 1}` : ''}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    calendarHTML += '</div>';
    
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