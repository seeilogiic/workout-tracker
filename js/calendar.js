// Calendar Functions
let selectedDate = new Date(); // Start with today as selected

function loadCalendar() {
    updateCalendarDisplay();
    renderCalendar();
}

function updateCalendarDisplay() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const selectedDateText = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    document.getElementById('currentMonthYear').textContent = selectedDateText;
}

function previousWeek() {
    selectedDate.setDate(selectedDate.getDate() - 7);
    updateCalendarDisplay();
    renderCalendar();
}

function nextWeek() {
    selectedDate.setDate(selectedDate.getDate() + 7);
    updateCalendarDisplay();
    renderCalendar();
}

function selectDate(date) {
    selectedDate = new Date(date);
    updateCalendarDisplay();
    renderCalendar();
}

function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    
    // Get workout data
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]');
    const notes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
    
    let calendarHTML = '';
    
    // Calculate the 7 days (3 before, selected day, 3 after)
    const weekDates = [];
    for (let i = -3; i <= 3; i++) {
        const date = new Date(selectedDate);
        date.setDate(selectedDate.getDate() + i);
        weekDates.push(date);
    }
    
    // Add weekday headers
    calendarHTML += '<div class="calendar-week-header">';
    weekDates.forEach(date => {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        calendarHTML += `<div class="weekday-header">${dayName}</div>`;
    });
    calendarHTML += '</div>';
    
    // Add week days
    calendarHTML += '<div class="calendar-week-days">';
    weekDates.forEach(date => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateKey = `${year}-${month}-${day}`;
        
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const isToday = date.toDateString() === new Date().toDateString();
        
        // Get workouts for this day
        const dayWorkouts = history.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate.getFullYear() === year && 
                   workoutDate.getMonth() === month - 1 && 
                   workoutDate.getDate() === day;
        });
        
        const dayNote = notes[dateKey];
        
        let dayClass = 'calendar-day';
        if (isSelected) dayClass += ' selected';
        if (isToday) dayClass += ' today';
        
        calendarHTML += `
            <div class="${dayClass}" onclick="selectDate('${date.toISOString()}')">
                <div class="calendar-day-circle">
                    <div class="calendar-day-number">${day}</div>
                    <div class="calendar-day-indicators">
                        ${dayWorkouts.length > 0 ? '<div class="workout-indicator"></div>' : ''}
                        ${dayNote ? '<div class="note-indicator"></div>' : ''}
                    </div>
                </div>
                <div class="calendar-day-content">
                    ${dayNote ? `
                        <div class="day-note-bubble">
                            <div class="note-bubble-icon">📝</div>
                            <div class="note-bubble-text">${dayNote.length > 20 ? dayNote.substring(0, 20) + '...' : dayNote}</div>
                        </div>
                    ` : ''}
                    ${dayWorkouts.length > 0 ? `
                        <div class="day-workout-bubble">
                            <div class="workout-bubble-icon">💪</div>
                            <div class="workout-bubble-text">${dayWorkouts[0].type}${dayWorkouts.length > 1 ? ` +${dayWorkouts.length - 1}` : ''}</div>
                        </div>
                    ` : ''}
                    ${!dayNote && dayWorkouts.length === 0 ? `
                        <div class="day-empty-bubble">
                            <div class="empty-bubble-text">No activities today</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });
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