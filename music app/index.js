const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Morad - Motorola (letra)ð±.mp3',
        displayName: 'Motorola',
        cover: 'assets/1.jpg',
        artist: 'Morad',
    },
    {
        path: 'assets/Travis Scott - FE!N ft. Playboi Carti.mp3',
        displayName: 'Fein',
        cover: 'assets/2.jpg',
        artist: 'Travis Scott',
    },
    {
        path: 'assets/MORAD & GIMS - SEYA (Official Video).mp3',
        displayName: 'SEYA',
        cover: 'assets/3.jpg',
        artist: 'Morad/GIMs',
    },
    {
        path: 'assets/MORAD - PELELE (Lyrics).mp3',
        displayName: 'pelele',
        cover: 'assets/3.jpg',
        artist: 'Morad',
    },
    {
        path: 'assets/Baby Gang â Casablanca (feat. Morad ) [Official Video].mp3',
        displayName: 'casablanca',
        cover: 'assets/3.jpg',
        artist: 'Baby Gang',
    },
    {
        path: 'assets/MORAD - CARRETERA [VIDEO OFICIAL]-2.mp3',
        displayName: 'carratera',
        cover: 'assets/3.jpg',
        artist: 'Morad',
    },
    {
        path: 'assets/Benzz - Je M appelle [Music Video] | GRM Daily.mp3',
        displayName: "Je m'appelle",
        cover: 'assets/3.jpg',
        artist: 'Benz',
    },
    {
        path: 'assets/JuL - Europa  Ft Morad, Elai & Rhove __ Clip Officiel __ 2022.mp3',
        displayName: "Europa",
        cover: 'assets/3.jpg',
        artist: 'Morad/Elai/Rhove',
    },
    {
        path: 'assets/Ransom.mp3',
        displayName: "Ransom",
        cover: 'assets/3.jpg',
        artist: 'lel Tecca',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


/*
const searchBar = document.getElementById('search');
searchBar.addEventListener('keyup', function() {
    const searchTerm = searchBar.value.toLowerCase(); // Get the search term and convert to lowercase for case-insensitive search
    filterSongs(searchTerm);
  });
  function filterSongs(searchTerm) {
    // Loop through the songs array
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i].displayName.toLowerCase();
      // Check if song title (converted to lowercase) includes the search term
      if (song.includes(searchTerm)) {
        // If a match is found, highlight the song in the player (optional)
        // You can change the display style (background color, font weight) based on your preference
        // Example: document.getElementById('music-title').style.backgroundColor = 'lightgreen';
  
        // If you want to automatically play the searched song, uncomment the following line:
        loadMusic(songs[i]);
        //playMusic();
  
        break; // Stop searching after finding the first match (optional)
      } else {
        // If no match, reset any highlighting (optional)
        document.getElementById('music-title').style.backgroundColor = '';
      }
    }
    if (searchTerm.trim() === '') {
        // If search term is empty and a previous search was made, play the last searched song
        if (lastSearchedIndex !== -1) {
          loadMusic(songs[lastSearchedIndex]);
          playMusic();
        }
      } else {
        // Otherwise, perform the search as before
        // ... your previous search logic here ...
    
        // Update the last searched index if a match is found
        for (let i = 0; i < songs.length; i++) {
          const song = songs[i].displayName.toLowerCase();
          if (song.includes(searchTerm)) {
            lastSearchedIndex = i;
            break;
          }
        }
      }
  }*/

      const searchBar = document.getElementById('search');
const submitButton = document.getElementById('submit');
let lastSearchedIndex = -1; // Track the last searched song index

submitButton.addEventListener('click', function() {
  const searchTerm = searchBar.value.toLowerCase();
  // Call filterSongs function with the search term to initiate the search
  filterSongs(searchTerm);
});

function filterSongs(searchTerm) {
  let foundSongIndex = -1;

  // Loop through the songs array to find a match
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i].displayName.toLowerCase();
    if (song.includes(searchTerm)) {
      foundSongIndex = i;
      break;
    }
  }

  // If a match is found, update the player elements and play the song
  if (foundSongIndex !== -1) {
    lastSearchedIndex = foundSongIndex; // Update last searched index
    loadMusic(songs[foundSongIndex]);
    
  } else {
    // If no match is found, display a message or handle it differently
    console.log('No song found for:', searchTerm);
  }
}

// Rest of your existing music player code

