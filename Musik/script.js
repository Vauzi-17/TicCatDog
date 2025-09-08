const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("title");

// List 5 lagu
const songs = [
  "Media/he.mp3",
  "Media/babi.mp3",
  "Media/Crash.mp3",
  "/Media/lagu4.mp3",
  "/Media/lagu5.mp3"
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

// Load lagu pertama
loadSong(songIndex);

function loadSong(index) {
  audio.src = songs[index];
  title.textContent = titles[index];
}

// Play / Pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>';
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause" style="color: #ffffff;"></i>';
  }
  isPlaying = !isPlaying;
});

// Next
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause" style="color: #ffffff;"></i>';
  isPlaying = true;
});

// Prev
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.innerHTML = '<i class="fa-solid fa-pause" style="color: #ffffff;"></i>';
  isPlaying = true;
});
