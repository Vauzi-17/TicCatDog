const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");

const togglePlayer = document.getElementById("togglePlayer");
const playerContainer = document.getElementById("playerContainer");
const minimizeBtn = document.getElementById("minimize");

// List 5 lagu
const songs = [
  "Musik/Media/babi.mp3",
  "Musik/Media/.mp3",
  "Musik/Media/.mp3",
  "Media/lagu4.mp3",
  "Media/lagu5.mp3"
];

const titles = [
  "Lagu 1 - ASINGBABUI",
  "Lagu 2 - kucing",
  "Lagu 3 - Crash",
  "Lagu 4",
  "Lagu 5"
];

let songIndex = 0;
let isPlaying = false;

// Load lagu
function loadSong(index) {
  audio.src = songs[index];
  title.textContent = titles[index];
}

// Play lagu
function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  isPlaying = true;
}

// Pause lagu
function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  isPlaying = false;
}

// Load lagu pertama dan langsung play
loadSong(songIndex);
playSong();

// Play / Pause tombol
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Prev
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Auto next ketika lagu selesai
audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Tampilkan player
togglePlayer.addEventListener("click", () => {
  playerContainer.classList.add("show");
});

// Sembunyikan player
minimizeBtn.addEventListener("click", () => {
  playerContainer.classList.remove("show");
});
