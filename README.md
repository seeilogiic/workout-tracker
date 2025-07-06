# Advanced Workout Tracker

A comprehensive Progressive Web App for tracking workouts with detailed exercise statistics, muscle group analysis, and intelligent recommendations for balanced training.

## 🏋️ Features

### Core Functionality
- ✅ **7 Workout Types**: Push, Pull, Legs, Upper, Lower, Full Body, Other
- ✅ **Exercise Tracking**: Add multiple exercises per workout with sets, reps, weight, and weight type
- ✅ **Auto-complete**: Smart exercise name suggestions based on your history
- ✅ **Previous Performance**: Shows your last performance for each exercise
- ✅ **Exercise Normalization**: "Barbell Curls" and "Barbell curl" treated as the same exercise

### Advanced Analytics
- ✅ **1RM Tracking**: Calculate estimated one-rep max using Brzycki formula
- ✅ **Progress Tracking**: Total, weekly, and monthly progress percentages
- ✅ **Exercise Statistics**: Detailed analysis of each exercise's performance
- ✅ **Visual Progress Bars**: Visual representation of progress trends
- ✅ **Workout Duration**: Automatic tracking of workout length

### Muscle Group Intelligence
- ✅ **Muscle Group Tracking**: Automatically identifies which muscle groups you're working
- ✅ **Missing Area Detection**: Identifies when you're not hitting specific areas within muscle groups
- ✅ **Smart Recommendations**: Suggests exercises to target missing muscle areas
- ✅ **Day-Specific Analysis**: Shows muscle summary for each calendar day
- ✅ **Exercise Library**: Comprehensive database of exercises by muscle group

### Calendar & Planning
- ✅ **Monthly Calendar View**: Visual calendar with workout and note indicators
- ✅ **Day Details**: Click any day to see detailed workout information
- ✅ **Notes & Goals**: Add notes and goals for specific days
- ✅ **Workout History**: Complete workout records with exercise details

### Body Weight Tracking
- ✅ **Weight Logging**: Track your body weight over time
- ✅ **Weight History**: View your weight progression
- ✅ **Scalable Charts**: Visual representation of weight trends

### Data Synchronization
- ✅ **GitHub Integration**: Sync your data across devices using GitHub Gists
- ✅ **Manual Sync**: Upload and download data as needed
- ✅ **Secure Storage**: Your data is stored securely in private GitHub Gists

### User Experience
- ✅ **Modern UI**: Dark theme with customizable color schemes
- ✅ **Hamburger Menu**: Clean navigation with slide-out menu
- ✅ **Mobile Optimized**: Responsive design for phones and tablets
- ✅ **Offline Capable**: Works without internet connection
- ✅ **Local Storage**: All data saved locally on your device

## 📊 Exercise Statistics

### What You Can Track
- **Total Sessions**: Number of times you've performed each exercise
- **Best Weight**: Your highest weight for each exercise
- **Estimated 1RM**: Calculated one-rep max using Brzycki formula
- **Average Weight**: Your average weight across all sessions
- **Progress Percentage**: Change in performance over time
- **Last Workout**: When you last performed each exercise

### 1RM Calculation
Uses the Brzycki formula: `1RM = weight × (36 / (37 - reps))`

## 🗓️ Calendar Features

### Monthly View
- **Workout Indicators**: Green dots show days with workouts
- **Note Indicators**: Orange dots show days with notes/goals
- **Today Highlighting**: Current day is highlighted
- **Navigation**: Easy month-to-month navigation

### Day Details
- **Workout Summary**: Complete workout details for each day
- **Exercise Breakdown**: Individual exercise performance
- **Muscle Group Analysis**: Which muscles were worked
- **Missing Area Recommendations**: Exercises to target missing areas
- **Notes & Goals**: Personal notes and goals for each day

## 🏗️ Muscle Group Intelligence

### Comprehensive Tracking
The app tracks specific muscle areas within each muscle group:

**Chest**: Upper chest, lower chest, chest isolation
**Back**: Upper back, middle back, lats, entire back
**Shoulders**: Anterior, lateral, posterior deltoids, traps
**Biceps**: Biceps brachii, brachialis, lower biceps, isolation
**Triceps**: Long head, lateral head, medial head
**Legs**: Quadriceps, quad isolation, hamstrings, ham isolation
**Glutes**: Gluteus maximus, gluteus medius
**Calves**: Gastrocnemius, soleus
**Abs**: Rectus abdominis, lower abs, obliques, core stability
**Forearms**: Flexor muscles, extensor muscles, grip strength

### Smart Recommendations
When you work a muscle group but miss specific areas, the app suggests exercises to target those missing areas.

## 🚀 How to Use

### Getting Started
1. Select a workout type (Push, Pull, Legs, etc.)
2. Click "Add Exercise" to start logging exercises
3. Fill in exercise details (name, sets, reps, weight, weight type)
4. View previous performance for the same exercise
5. Save exercises and complete your workout

### Navigation
- **Home**: Main workout selection and progress overview
- **Calendar**: Monthly view of workouts and notes
- **Exercise Statistics**: Detailed exercise analysis
- **Body Weight**: Track your body weight
- **Exercise Library**: Browse exercises by muscle group
- **Settings**: GitHub sync and app preferences

### Exercise Statistics
1. Navigate to "Exercise Statistics"
2. Select an exercise from the dropdown
3. View your progress, 1RM, and recommendations
4. Track your performance over time

### Calendar Usage
1. Navigate to "Calendar" to see monthly view
2. Click any day to view detailed information
3. Add notes or goals for specific days
4. View muscle group analysis for each workout day

## 💾 Data Storage

### Local Storage
All data is stored locally in your browser:
- **Workout History**: Complete workout records with exercises
- **Exercise Statistics**: 1RM calculations and progress data
- **Body Weight**: Weight tracking history
- **Calendar Notes**: Personal notes and goals
- **App Settings**: User preferences and sync settings

### GitHub Sync (Optional)
- **Secure Backup**: Your data is backed up to private GitHub Gists
- **Cross-Device**: Access your data from any device
- **Manual Control**: Choose when to upload/download data

## 🔧 Technical Details

### Modular Architecture
The app is built with a clean, modular structure for maintainability:

```
simple_workout_app/
├── index.html (328 lines - main interface)
├── css/
│   └── styles.css (1,659 lines - all styling)
├── js/
│   ├── app.js (402 lines - core functionality)
│   ├── calendar.js (213 lines - calendar features)
│   ├── exercise-library.js (295 lines - exercise database)
│   ├── stats.js (283 lines - statistics & weight tracking)
│   └── sync.js (263 lines - GitHub integration)
└── README.md
```

### Progressive Web App Features
- **Offline Functionality**: Works without internet connection
- **Local Storage**: Persistent data storage
- **Responsive Design**: Works on all device sizes
- **Mobile Optimized**: Touch-friendly interface

### Exercise Normalization
- Removes trailing 's' from exercise names
- Converts to lowercase for comparison
- Groups similar exercises together for accurate tracking

## 📱 Installation

### On Mobile Devices
1. Visit the app URL in your browser
2. The app works immediately - no installation required
3. Works offline after initial load
4. Can be bookmarked for easy access

### On Desktop
1. Open the app in your browser
2. Use browser's bookmark feature for easy access
3. Works offline after initial load

## 🎯 Current Features

### ✅ Implemented
- Complete workout tracking with exercise details
- Exercise statistics and 1RM calculations
- Calendar view with workout and note tracking
- Muscle group analysis and recommendations
- Body weight tracking
- GitHub data synchronization
- Modern, responsive UI
- Exercise library with muscle group organization
- Previous exercise performance display
- Workout duration tracking

### 🔄 Future Enhancements
Potential features for future versions:
- Rest timer between sets
- Workout templates and routines
- Advanced analytics and insights
- Export/import functionality
- Social sharing features
- Integration with fitness trackers
- Advanced charting and visualization
- Workout planning and scheduling

## 📄 File Structure

- `index.html` - Main application interface
- `css/styles.css` - All application styling
- `js/app.js` - Core workout tracking functionality
- `js/calendar.js` - Calendar and day detail features
- `js/exercise-library.js` - Exercise database and muscle tracking
- `js/stats.js` - Statistics and weight tracking
- `js/sync.js` - GitHub integration
- `README.md` - This documentation

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

**Built with ❤️ for fitness enthusiasts who want to track their progress intelligently and maintain balanced muscle development.** 