// GitHub Sync Functions

function showSyncSettings() {
    document.getElementById('workoutSelection').style.display = 'none';
    document.getElementById('workoutTracking').classList.remove('active');
    document.getElementById('historySection').classList.remove('active');
    document.getElementById('statsSection').classList.remove('active');
    document.getElementById('syncSection').classList.add('active');
    
    loadSyncStatus();
}

function loadSyncStatus() {
    const token = localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);
    const gistId = localStorage.getItem(STORAGE_KEYS.GIST_ID);
    const statusContainer = document.getElementById('syncStatus');
    
    let statusHTML = '';
    
    if (token && gistId) {
        statusHTML = `
            <div class="sync-status">
                <h3>Sync Status</h3>
                <div class="sync-status-text">
                    ✅ Connected to GitHub<br>
                    Gist ID: ${gistId}<br>
                    Last sync: ${getLastSyncTime()}
                </div>
                <div class="sync-actions">
                    <button class="sync-btn" onclick="uploadToGitHub()">Upload Data</button>
                    <button class="sync-btn" onclick="downloadFromGitHub()">Download Data</button>
                    <button class="sync-btn secondary" onclick="disconnectGitHub()">Disconnect</button>
                </div>
            </div>
        `;
    } else {
        statusHTML = `
            <div class="sync-status">
                <h3>GitHub Sync</h3>
                <div class="sync-status-text">
                    Connect your GitHub account to sync your workout data across devices.
                </div>
                <div class="sync-actions">
                    <button class="sync-btn" onclick="connectGitHub()">Connect GitHub</button>
                </div>
            </div>
        `;
    }
    
    statusContainer.innerHTML = statusHTML;
}

function connectGitHub() {
    const token = prompt('Enter your GitHub Personal Access Token:');
    if (!token) return;
    
    // Test the token by making a simple API call
    fetch(`${GITHUB_CONFIG.API_BASE}/user`, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid token');
        }
    })
    .then(user => {
        localStorage.setItem(STORAGE_KEYS.GITHUB_TOKEN, token);
        
        // Create a new gist for the user
        return createGitHubGist(token);
    })
    .then(gistId => {
        localStorage.setItem(STORAGE_KEYS.GIST_ID, gistId);
        localStorage.setItem('lastSyncTime', new Date().toISOString());
        
        // Upload current data
        return uploadToGitHub();
    })
    .then(() => {
        alert('Successfully connected to GitHub! Your data has been uploaded.');
        loadSyncStatus();
    })
    .catch(error => {
        console.error('GitHub connection error:', error);
        alert('Failed to connect to GitHub. Please check your token and try again.');
    });
}

function createGitHubGist(token) {
    const workoutData = getAllAppData();
    
    return fetch(`${GITHUB_CONFIG.API_BASE}/gists`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: 'Workout Tracker Data',
            public: false,
            files: {
                [GITHUB_CONFIG.GIST_FILENAME]: {
                    content: JSON.stringify(workoutData, null, 2)
                }
            }
        })
    })
    .then(response => response.json())
    .then(gist => gist.id);
}

function uploadToGitHub() {
    const token = localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);
    const gistId = localStorage.getItem(STORAGE_KEYS.GIST_ID);
    
    if (!token || !gistId) {
        alert('Please connect to GitHub first.');
        return;
    }
    
    const workoutData = getAllAppData();
    
    return fetch(`${GITHUB_CONFIG.API_BASE}/gists/${gistId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            files: {
                [GITHUB_CONFIG.GIST_FILENAME]: {
                    content: JSON.stringify(workoutData, null, 2)
                }
            }
        })
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem('lastSyncTime', new Date().toISOString());
            alert('Data uploaded successfully!');
            loadSyncStatus();
        } else {
            throw new Error('Upload failed');
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        alert('Failed to upload data. Please try again.');
    });
}

function downloadFromGitHub() {
    const token = localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);
    const gistId = localStorage.getItem(STORAGE_KEYS.GIST_ID);
    
    if (!token || !gistId) {
        alert('Please connect to GitHub first.');
        return;
    }
    
    return fetch(`${GITHUB_CONFIG.API_BASE}/gists/${gistId}`, {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(gist => {
        const file = gist.files[GITHUB_CONFIG.GIST_FILENAME];
        if (file && file.content) {
            const workoutData = JSON.parse(file.content);
            restoreAppData(workoutData);
            localStorage.setItem('lastSyncTime', new Date().toISOString());
            alert('Data downloaded successfully!');
            loadSyncStatus();
            loadData(); // Refresh the UI
        } else {
            throw new Error('No data file found');
        }
    })
    .catch(error => {
        console.error('Download error:', error);
        alert('Failed to download data. Please try again.');
    });
}

function disconnectGitHub() {
    if (confirm('Are you sure you want to disconnect from GitHub? This will remove your sync settings.')) {
        localStorage.removeItem(STORAGE_KEYS.GITHUB_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.GIST_ID);
        localStorage.removeItem('lastSyncTime');
        loadSyncStatus();
        alert('Disconnected from GitHub.');
    }
}

function getAllAppData() {
    return {
        workoutHistory: JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY) || '[]'),
        workoutCount: localStorage.getItem(STORAGE_KEYS.WORKOUT_COUNT) || '0',
        lastWorkout: localStorage.getItem(STORAGE_KEYS.LAST_WORKOUT) || '',
        lastWorkoutDate: localStorage.getItem(STORAGE_KEYS.LAST_WORKOUT_DATE) || '',
        weightHistory: JSON.parse(localStorage.getItem('weightHistory') || '[]'),
        calendarNotes: JSON.parse(localStorage.getItem('calendarNotes') || '{}'),
        syncVersion: '1.0'
    };
}

function restoreAppData(data) {
    if (data.workoutHistory) {
        localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(data.workoutHistory));
    }
    if (data.workoutCount) {
        localStorage.setItem(STORAGE_KEYS.WORKOUT_COUNT, data.workoutCount);
    }
    if (data.lastWorkout) {
        localStorage.setItem(STORAGE_KEYS.LAST_WORKOUT, data.lastWorkout);
    }
    if (data.lastWorkoutDate) {
        localStorage.setItem(STORAGE_KEYS.LAST_WORKOUT_DATE, data.lastWorkoutDate);
    }
    if (data.weightHistory) {
        localStorage.setItem('weightHistory', JSON.stringify(data.weightHistory));
    }
    if (data.calendarNotes) {
        localStorage.setItem('calendarNotes', JSON.stringify(data.calendarNotes));
    }
}

function getLastSyncTime() {
    const lastSync = localStorage.getItem('lastSyncTime');
    if (lastSync) {
        return new Date(lastSync).toLocaleString();
    }
    return 'Never';
}

// Auto-sync functionality (optional)
function enableAutoSync() {
    // Check for auto-sync every 5 minutes
    setInterval(() => {
        const token = localStorage.getItem(STORAGE_KEYS.GITHUB_TOKEN);
        const gistId = localStorage.getItem(STORAGE_KEYS.GIST_ID);
        
        if (token && gistId) {
            uploadToGitHub().catch(error => {
                console.log('Auto-sync failed:', error);
            });
        }
    }, 5 * 60 * 1000); // 5 minutes
}

// Initialize auto-sync if enabled
if (localStorage.getItem('autoSyncEnabled') === 'true') {
    enableAutoSync();
} 