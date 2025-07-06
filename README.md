# Simple Workout Tracker

A super simple web app for tracking your workout types that works entirely on your phone without needing internet or a server.

## Features

- ✅ 7 workout type options: Push, Pull, Legs, Upper, Lower, Full Body, Other
- ✅ Saves all data locally on your phone
- ✅ Works offline (Progressive Web App)
- ✅ Tracks workout count and last workout
- ✅ Beautiful, mobile-friendly design
- ✅ Can be installed as an app on your phone

## How to Use

### On Your Computer (for testing):
1. Open the `index.html` file in your web browser
2. Click on any workout type button
3. Your selection will be saved locally

### On Your Phone:
1. **Option 1 - Direct access:**
   - Host the files on a simple web server (like GitHub Pages, Netlify, or your own server)
   - Visit the URL on your phone
   - Tap "Add to Home Screen" when prompted

2. **Option 2 - Local network:**
   - Start a simple web server on your computer
   - Connect your phone to the same WiFi network
   - Visit your computer's IP address on your phone
   - Example: `http://192.168.1.100:8000`

3. **Option 3 - File sharing:**
   - Use a service like ngrok to expose your local server
   - Share the ngrok URL with your phone

## Quick Setup for Local Testing

If you have Python installed:
```bash
cd simple_workout_app
python -m http.server 8000
```

Then visit `http://localhost:8000` on your computer or `http://[your-computer-ip]:8000` on your phone.

## How It Works

- **Local Storage**: All data is saved in your browser's local storage
- **Progressive Web App**: Can be installed on your phone like a native app
- **Offline Capable**: Works without internet connection
- **No Backend**: Everything runs in your browser

## Data Stored Locally

- Selected workout type
- Total workout count
- Last workout type and timestamp

## Future Enhancements

This is a simple starting point. Future versions could include:
- Exercise tracking within each workout type
- Set and rep counting
- Progress charts
- Workout history
- Custom workout types
- Export/import functionality

## Files

- `index.html` - Main app interface
- `manifest.json` - PWA configuration
- `sw.js` - Service worker for offline functionality
- `README.md` - This file 