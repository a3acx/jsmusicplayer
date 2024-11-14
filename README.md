# Web-Based Audio Player

This project is a web-based audio player that allows users to create, manage, and play playlists of audio files directly from their browser. It supports various use cases, including playback on Bluetooth speakers, computer speakers, or other audio output devices.

## Key Features

1. **Upload & Play Audio Files**
   - Users can upload multiple audio files at once to create a playlist, which they can play, pause, skip, or repeat.

2. **Playlist Management**
   - The player maintains a playlist of up to 10 songs, with functionality to navigate between songs using "Next" and "Previous" buttons, including looped playback.

3. **Media Session API for External Controls**
   - Integrates with the Media Session API to support system-level media keys (e.g., on Mac keyboards) and Bluetooth speaker controls for play/pause, next, and previous track functions.

4. **Persistent Playlist**
   - Uses **localStorage** to save song names and the current position in the playlist, allowing users to reload the page and reselect files without losing their place.

5. **Responsive UI with Dark Theme**
   - Includes a styled, user-friendly interface with dark-themed colors (black and orange-red) and centered controls for a polished user experience.

## Use Cases

- **Bluetooth Speaker Control**: Allows users to play and control audio files directly on a Bluetooth speaker, with the ability to fast forward, rewind, or change tracks.
- **Computer Playback**: Functions as a standard web-based audio player for any computer with speakers or connected audio output devices.

This project offers a versatile audio player experience with a modern, user-centered interface suitable for both desktop and Bluetooth speaker playback.
