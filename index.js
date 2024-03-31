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

// Pequeña base de datos a partir de un array
const songs = [
    {
        path: '/assets/ZutomayoStudyMe.mp4',
        displayName: 'Study-Me',
        cover:'/assets/img1.jpg',
        artist: 'ZUTOMAYO'    
    },
    
    {
        path: '/assets/EVE.mp4',
        displayName: 'Kororon',
        cover:'/assets/img2.jpg',
        artist: 'EVE'    
    },
    {
        path: '/assets/YOASOBI.mp4',
        displayName: '群青',
        cover:'/assets/img3.jpg',
        artist: 'YOASOBI'    
    },
    {
        path: '/assets/RAMDARAM.mp4',
        displayName: '📺Soda City Funk',
        cover:'/assets/img4.jpg',
        artist: '람다람 RAMDARAM'    
    },
    {
        path: '/assets/PSYQUI.mp4',
        displayName: 'ヒステリックナイトガール',
        cover:'/assets/img5.jpg',
        artist: 'PSYQUI'    
    }];

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
    // Cambia el icono de play a pausa
    playBtn.classList.replace('fa-play', 'fa-pause');
     // Hace un set del titulo del boton al hacer hover
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Cambia el icono de pausa a play
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Hace un set del titulo del boton al hacer hover
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