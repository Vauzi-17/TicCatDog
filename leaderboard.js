function updateLeaderboard(winnerName) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

  if (!leaderboard[winnerName]) {
    leaderboard[winnerName] = 0;
  }
  leaderboard[winnerName]++;

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  renderLeaderboard();
}

function renderLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};
  let leaderboardEl = document.getElementById('leaderboard');

  leaderboardEl.innerHTML = "";

  let sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([name, score], index) => {
    let li = document.createElement("li");
    li.textContent = `${index + 1}. ${name} — ${score} 🏆`;
    leaderboardEl.appendChild(li);
  });
}

function resetLeaderboard() {
  localStorage.removeItem("leaderboard");
  renderLeaderboard();
}

// jalankan saat halaman dibuka
renderLeaderboard();
