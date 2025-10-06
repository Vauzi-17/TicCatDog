function simpanNama() {
    let player1 = document.getElementById('player1');
    let player2 = document.getElementById('player2');
    let dialog = document.getElementById('dialogNama');
    let user1 = document.getElementById('user1');
    let user2 = document.getElementById('user2');

    let x1 = player1.value.trim();
    let x2 = player2.value.trim();

    if (x1 === "" || x2 === "") {
        alert("Isi dulu namanya");
        return false;
    }

    localStorage.setItem("player1", x1)
    localStorage.setItem("player2", x2)

    dialog.classList.add("hidden")

    user1.innerHTML = x1;
    user2.innerHTML = x2;

    // // Ambil data lama dari localStorage
    // let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // // Tambahkan nama baru
    // leaderboard.push(x1);
    // leaderboard.push(x2)

    // // Simpan kembali ke localStorage
    // localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // // Update tampilan user
    // user.innerHTML = x;

    // // Sembunyikan dialog
    // dialog.classList.add("hidden");

    // // Render leaderboard
    // renderLeaderboard();
}

// function renderLeaderboard() {
//     let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
//     let leaderboardEl = document.getElementById('leaderboard');

//     leaderboardEl.innerHTML = ""; // hapus isi lama

//     leaderboard.forEach((nama, index) => {
//         let li = document.createElement("li");
//         li.textContent = `${index + 1}. ${nama}`;
//         leaderboardEl.appendChild(li);
//     });
// }

// // Jalankan saat halaman dibuka biar leaderboard langsung tampil
// renderLeaderboard();
