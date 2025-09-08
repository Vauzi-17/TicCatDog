function simpanNama() {
    nama = document.getElementById('nama')
    dialog = document.getElementById('dialogNama')
    user = document.getElementById('user')

    var x = nama.value

    if (x == "" || x == null) {
        alert("Isidulu namanyaaaa")
        return false;
    }

    localStorage.setItem("nama", nama.value);

    dialog.classList.add("hidden")

    var data = localStorage.getItem("nama")
    user.innerHTML = data
}
