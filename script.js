const audioFileInput = document.getElementById('audioFileInput');
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const playPauseButton = document.getElementById('playPauseButton');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const status = document.getElementById('status');

let playlist = [];
let currentSongIndex = 0;


window.addEventListener('load', () => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    const savedIndex = parseInt(localStorage.getItem('currentSongIndex'), 10) || 0;

    if (savedPlaylist.length > 0) {
        status.textContent = 'Reload your playlist by selecting saved files again.';
        playlist = savedPlaylist.map(name => ({ name, file: null }));
        currentSongIndex = savedIndex;
    }
});


audioFileInput.addEventListener('change', (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
        playlist = files.map(file => ({ name: file.name, file }));
        currentSongIndex = 0;
        loadSong(currentSongIndex);
        savePlaylistToLocalStorage();
        status.textContent = 'Status: Playlist ready';
    }
});


function savePlaylistToLocalStorage() {
    const fileNames = playlist.map(item => item.name);
    localStorage.setItem('playlist', JSON.stringify(fileNames));
    localStorage.setItem('currentSongIndex', currentSongIndex);
}

function loadSong(index) {
    if (index >= 0 && index < playlist.length) {
        const file = playlist[index].file;
        if (file) {
            const fileURL = URL.createObjectURL(file);
            audioSource.src = fileURL;
            audioPlayer.load();
            audioPlayer.style.display = 'block';
            playPauseButton.textContent = 'Play';
            status.textContent = `Playing: ${playlist[index].name}`;
        } else {
            status.textContent = `Select files to play: ${playlist[index].name}`;
        }
    }
}

let isPlaying = false;

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    } else {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    savePlaylistToLocalStorage();
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
}
function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    savePlaylistToLocalStorage();
    loadSong(currentSongIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
}
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPreviousSong);
audioPlayer.addEventListener('ended', playNextSong);
if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
        audioPlayer.play();
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        audioPlayer.pause();
        isPlaying = false;
        playPauseButton.textContent = 'Play';
    });

    navigator.mediaSession.setActionHandler('nexttrack', playNextSong);
    navigator.mediaSession.setActionHandler('previoustrack', playPreviousSong);
}
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        playPauseButton.click();
    } else if (event.key === 'n') {
        nextButton.click();
    } else if (event.key === 'p') {
        prevButton.click();
    }
});
