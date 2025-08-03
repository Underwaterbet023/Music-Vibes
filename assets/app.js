let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = new Audio();

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
    {
        img: "assets/Images/1.jpeg",
        name: "Heeriye",
        artist: "Jasleen Royal & Arijit Singh",
        music: "assets/Music/Heeriye.mp3",
    },

    
    {
        img: "assets/Images/2.jpg",
        name: "Royalty",
        artist: "Egzod, Maestro Chives",
        music: "assets/Music/Egzod.mp3",
    },

    {
        img: "assets/Images/3.jpg",
        name: "Cartoon, On & On",
        artist: "Daniel Levi",
        music: "assets/Music/Cartoon.mp3",
    },

    {
        img: "assets/Images/4.jpg",
        name: "Welcome To My Hood",
        artist: "Diljit Dosanjh",
        music: "assets/Music/Welcome To My Hood Diljit Dosanjh.mp3",
        
    },

      {
        img: "assets/Images/6.jpg",
        name: "Make Some Noise For The Desi Boyz",
        artist: "Sohail Sen, Asees Kaur, and Manj Musik",
        music: "assets/Music/Make Some Noise For The Desi Boyz.mp3",
        
    },

      {
        img: "assets/Images/7.jpg",
        name: "Get Ready To Fight",
        artist: "Pranay Rijia",
        music: "assets/Music/Get Ready To Fight - Baaghi (Benny Dayal) 320Kbps.mp3",
        
    },

      {
        img: "assets/Images/8.jpg",
        name: "Challa",
        artist: "Omy, Vivek Hariharan & Shashwat Sachdeva",
        music: "assets/Music/Challa .mp3",
        
    },

      {
        img: "assets/Images/9.jpg",
        name: "Chhote Chhote Peg",
        artist: "T Series",
        music: "assets/Music/Chhote Chhote Peg - Sonu Ke Titu Ki Sweety.mp3",
        
    },

      {
        img: "assets/Images/10.jpg",
        name: "Nakhre - Zack Knight",
        artist: "Zack Knight",
        music: "assets/Music/Nakhre - Zack Knight.mp3",
        
    },

      {
        img: "assets/Images/11.jpg",
        name: "Main Tera Dhadkan Teri",
        artist: "Hard Kaur, KK and Sunidhi Chauhan",
        music: "assets/Music/Main Tera Dhadkan Teri (Ajab Prem Ki Ghazab Kahani).mp3",
        
    },
];

// Load a track
function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom = !isRandom;
    randomIcon.classList.toggle('randomActive');
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add("randomActive");
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add("rotate");
    wave.classList.add("loader");
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    document.querySelector('.nav-btn i.fa-play-circle').classList.replace('fa-play-circle', 'fa-pause-circle');
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove("rotate");
    wave.classList.remove("loader");
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    document.querySelector('.nav-btn i.fa-pause-circle').classList.replace('fa-pause-circle', 'fa-play-circle');
}


function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}



function nextTrack() {
    if (isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        track_index = (track_index < music_list.length - 1) ? track_index + 1 : 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index > 0) ? track_index - 1 : music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

// Synchronize volume slider with current track volume
volume_slider.value = curr_track.volume * 100;


// Set update for the slider
function setUpdate() {
    let seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

// Reset values
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Toggle music library
function toggleMusicLibrary() {
    const library = document.getElementById('music-library');
    if (library.style.display === "none" || library.style.display === "") {
        library.style.display = "block";
    } else {
        library.style.display = "none";
    }
}

// Load initial track
loadTrack(track_index);

const videoElement = document.getElementById('background-video');
const videoSources = [
    'assets/Video/video1.mp4',
    'assets/Video/video2.mp4',
    'assets/Video/video3.mp4',
    'assets/Video/video4.mp4',
    'assets/Video/video5.mp4',
    'assets/Video/video6.mp4',
    'assets/Video/video7.mp4',
    'assets/Video/video8.mp4',
];

let videoIndex = 0;

// Function to load the next video
function changeVideo() {
    videoElement.src = videoSources[videoIndex];
    videoElement.play();
    videoIndex = (videoIndex + 1) % videoSources.length; // Loop back to the first video after the last one
}

// Initial video load
changeVideo();
// Change the video every 20 seconds (20000 milliseconds)
setInterval(changeVideo, 20000);


function toggleLibrary() {
    // You can implement your library display logic here
    // For now, just logging a message to the console
    console.log("Library button clicked! Display your library here.");
}

// Existing code...

function toggleLibrary() {
    const library = document.getElementById('music-library');
    library.style.display = library.style.display === 'block' ? 'none' : 'block';
    populateLibrary(); // Dynamically populate the music library when opened
}

function populateLibrary() {
    const trackList = document.getElementById('track-list');
    trackList.innerHTML = ''; // Clear any existing list

    music_list.forEach((track, index) => {
        let li = document.createElement('li');
        li.classList.add('track-item');
        li.textContent = `${track.name} - ${track.artist}`;
        li.onclick = () => {
            track_index = index;
            loadTrack(track_index);
            playTrack();
        };
        trackList.appendChild(li);
    });
}


function selectTrack(index) {
    track_index = index; // Set the current track index
    loadTrack(track_index); // Load and play the track
    playTrack(); // Start playing the track
    document.getElementById("music-library").style.display = "none"; // Hide library after selection
}

// Toggle Tags Drawer
function toggleTags() {
    const drawer = document.getElementById('tags-drawer');
    drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
}

// Populate Albums in the Dropdown
function populateAlbums() {
    const albumList = document.getElementById("album-list");
    albumList.innerHTML = ""; // Clear current list

    music_list.forEach((track, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = track.name;
        listItem.onclick = () => selectTrack(index); // Play track on click
        albumList.appendChild(listItem);
    });
}

// Call this when page loads to populate albums
populateAlbums();

function toggleSearchBar() {
    const searchBar = document.getElementById('search-bar');
    searchBar.style.display = (searchBar.style.display === 'block') ? 'none' : 'block';
}

// Function to handle the search button or 'Enter' key press
function searchSong() {
    const query = document.getElementById('search-input').value.toLowerCase();

    // Search for the song in the music_list array
    const foundTrack = music_list.find(track => track.name.toLowerCase().includes(query));

    if (foundTrack) {
        // Find the index of the track
        const trackIndex = music_list.indexOf(foundTrack);
        // Load and play the found track
        loadTrack(trackIndex);
        playTrack();
    } else {
        alert("Song not found in the library!");
    }
}

// Add 'Enter' key event listener for search
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchSong();
    }
});

function openAbout() {
    const aboutBox = document.getElementById('about-box');
    // Add the 'show' class to make the section visible
    aboutBox.classList.add('show');
}

function closeAbout() {
    const aboutBox = document.getElementById('about-box');
    // Remove the 'show' class to hide the section
    aboutBox.classList.remove('show');
}



