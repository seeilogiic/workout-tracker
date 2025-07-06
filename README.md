# Advanced Workout Tracker

A comprehensive Progressive Web App for tracking workouts with detailed exercise statistics, volume analysis, and intelligent progressive overload recommendations.

## 🏋️ Features

### Core Functionality
- ✅ **7 Workout Types**: Push, Pull, Legs, Upper, Lower, Full Body, Other
- ✅ **Exercise Tracking**: Add multiple exercises per workout with sets, reps, weight, and weight type
- ✅ **Auto-complete**: Smart exercise name suggestions based on your history
- ✅ **Volume Calculation**: Automatic calculation of total volume (sets × reps × weight)
- ✅ **Exercise Normalization**: "Barbell Curls" and "Barbell curl" treated as the same exercise

### Advanced Analytics
- ✅ **1RM Tracking**: Calculate estimated one-rep max using Brzycki formula
- ✅ **Progress Tracking**: Total, yearly, and monthly progress percentages
- ✅ **Volume Trends**: Track volume changes over time
- ✅ **Progressive Overload Recommendations**: AI-powered suggestions for continued progress
- ✅ **Visual Charts**: Progress charts showing 1RM trends over time

### User Experience
- ✅ **Professional UI**: Dark theme with green/teal accents
- ✅ **Mobile Optimized**: Responsive design for phones and tablets
- ✅ **Offline Capable**: Works without internet connection
- ✅ **Local Storage**: All data saved locally on your device
- ✅ **PWA Ready**: Can be installed as a native app

## 📊 Exercise Statistics

### What You Can Track
- **Current 1RM**: Your estimated one-rep max
- **Progress Percentages**: Total, yearly, and monthly changes
- **Volume Analysis**: Total volume per exercise and trends
- **Recent Sessions**: Last 10 workout sessions with details
- **Smart Recommendations**: Weight and rep suggestions based on performance

### Progressive Overload Recommendations
The app analyzes your recent performance and provides:
- **Volume Increasing**: Suggests weight increases
- **Volume Stable**: Recommends rep or weight increases
- **Volume Decreasing**: Advises maintaining current levels

## 🚀 How to Use

### Getting Started
1. Select a workout type (Push, Pull, Legs, etc.)
2. Click "Add Exercise" to start logging exercises
3. Fill in exercise details (name, sets, reps, weight, weight type)
4. Save exercises and complete your workout
5. View your progress in the Exercise Statistics section

### Exercise Statistics
1. Click "Exercise Statistics" from the main menu
2. Select an exercise from the dropdown
3. View your progress, charts, and recommendations
4. Track your 1RM and volume trends over time

### Workout History
- View all completed workouts with exercise details
- See workout dates, types, and exercise summaries
- Track your consistency and progress

## 💾 Data Storage

All data is stored locally in your browser:
- **Workout History**: Complete workout records with exercises
- **Exercise Statistics**: 1RM calculations and progress data
- **Volume Trends**: Historical volume data for analysis
- **User Preferences**: App settings and preferences

## 🔧 Technical Details

### Progressive Web App Features
- **Service Worker**: Enables offline functionality
- **Web App Manifest**: Allows installation as native app
- **Local Storage**: Persistent data storage
- **Responsive Design**: Works on all device sizes

### 1RM Calculation
Uses the Brzycki formula: `1RM = weight × (36 / (37 - reps))`

### Volume Calculation
Total volume = sets × reps × weight

### Exercise Normalization
- Removes trailing 's' from exercise names
- Converts to lowercase for comparison
- Groups similar exercises together

## 📱 Installation

### On Mobile Devices
1. Visit the app URL in your browser
2. Tap "Add to Home Screen" when prompted
3. The app will install like a native app
4. Works offline after initial load

### On Desktop
1. Open the app in your browser
2. Use browser's "Install" option (if available)
3. Or simply bookmark for easy access

## 🎯 Future Enhancements

Potential features for future versions:
- Rest timer between sets
- Workout templates and routines
- Body weight tracking
- Export/import functionality
- Social sharing features
- Advanced analytics and insights
- Integration with fitness trackers

## 📄 Files

- `index.html` - Main application interface
- `manifest.json` - PWA configuration
- `sw.js` - Service worker for offline functionality
- `README.md` - This documentation

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

**Built with ❤️ for fitness enthusiasts who want to track their progress intelligently.** 