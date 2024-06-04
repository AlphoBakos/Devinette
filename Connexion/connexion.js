const form = document.getElementById("form-connexion")

form.addEventListener("submit", e => {
    e.preventDefault()

    const username = document.getElementById("username")
    const password = document.getElementById("password")

    if (username.value.trim() === "" || password.value.trim() === "") {
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    users.map(user => {
        if (user.nomUtilisateur === username.value && user.mdp === password.value) {
            localStorage.setItem("utilisateur_connecte", JSON.stringify(user))
            window.location.pathname = "../page/home.html"
        }
        else {
            MessageAlerte()
        }


    })
})

function MessageAlerte() {
    const avert = document.getElementById("avert")
    avert.innerHTML = "Nom d'utilisateur ou mot de pass incorrect"
    avert.classList.toggle('d-none')
    setTimeout(() => {
        avert.classList.toggle('d-none')
    }, 1000);
}