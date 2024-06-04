let score = 0;
const classement = document.getElementById("classement")
const nom_utilisateur = document.getElementById("username")
const utilisateur_connecte = JSON.parse(localStorage.getItem("utilisateur_connecte")) || ""
document.getElementById("photo").src = utilisateur_connecte.photo

const players = JSON.parse(localStorage.getItem("users")) || []

document.addEventListener("DOMContentLoaded", () => {
    nom_utilisateur.innerText = utilisateur_connecte.nomUtilisateur
    players.map(player => {
        const ul = document.createElement("ul")
        ul.innerHTML = player.nomUtilisateur + `<span>${player.score}</span>`

        classement.appendChild(ul)
    })
})

function refreshClassement() {
    classement.innerHTML = ""
    const players = JSON.parse(localStorage.getItem("users"))

    const sortedPlayers = players.sort((a, b) => { return b.score - a.score });

    sortedPlayers.map(player => {
        if (player.nomUtilisateur === utilisateur_connecte.nomUtilisateur) {
            player.score = score
        }

        const ul = document.createElement("ul")
        ul.innerHTML = player.nomUtilisateur + `<span>${player.score}</span>`

        classement.appendChild(ul)
    })

    localStorage.setItem("users", JSON.stringify(sortedPlayers))
}

fetch("/liste2.txt")
    .then(response => response.text())
    .then(data => {

        let listeMot = data.split("\n");
        let indice = Math.floor(Math.random() * listeMot.length);
        let motaDev = listeMot[indice].trim();
        let motCache = "---" + motaDev.substring(3, motaDev.length - 1) + "-";
        let nbTentative = 0;
        let successConsecutive = 0;


        function genererMotMystere() {
            let indice = Math.floor(Math.random() * listeMot.length);
            motaDev = listeMot[indice].trim();
            motCache = "---" + motaDev.substring(3, motaDev.length - 1) + "-";
            document.getElementById("mot").innerHTML = motCache;
        }

        genererMotMystere();

        let entrerMotaDev = document.getElementById("deviner");
        let bntvalider = document.getElementById("valider");
        let tentativeEl = document.getElementById("Tentative");
        let pointEl = document.getElementById("score");

        function mettreAJourAffichage() {
            pointEl.innerHTML = "Score : " + score + " pts";
            tentativeEl.innerHTML = "Tentative : " + nbTentative;
            entrerMotaDev.value = '';
        }

        function resetGame() {
            score = 0;
            nbTentative = 0;
            successConsecutive = 0;
            pointEl.innerHTML = "Score : 0 pts";
            tentativeEl.innerHTML = "Tentative : 0";
        }

        bntvalider.addEventListener('click', () => {
            const proposition = entrerMotaDev.value.trim().toLowerCase();

            if (proposition === motaDev.toLowerCase()) {
                messageDeReussite()
                if (successConsecutive >= 5) {
                    score += Math.floor(successConsecutive / 5) * 10;
                }
                else {
                    score += 1;
                }
                successConsecutive++;
                nbTentative = 0;

                genererMotMystere()
                refreshClassement()
                refreshClassement()
            } else {
                genererMotMystere();
                nbTentative++;
                if (nbTentative >= 3) {
                    score = Math.max(score - Math.floor(score / 5));
                    MessageAlerte();
                    refreshClassement()
                }
                successConsecutive = 0;
            }

            if (nbTentative === 5) {
                localStorage.setItem("users", JSON.stringify(players))
                MessageEchec()
                resetGame()
            }

            mettreAJourAffichage();
        });

        function messageDeReussite() {
            const reussi = document.getElementById("reussi")
            reussi.innerHTML = "Vous avez trouvé le mot"
            reussi.classList.toggle('d-none')
            setTimeout(() => {
                reussi.classList.toggle('d-none')
            }, 1500);
        }

        function MessageEchec() {
            const echec = document.getElementById("echec")
            echec.innerHTML = "Vous avez perdue en échouant 5 fois de suite"
            echec.classList.toggle('d-none')
            setTimeout(() => {
                echec.classList.toggle('d-none')
            }, 1500);
        }

        function MessageAlerte() {
            const echec = document.getElementById("avert")
            echec.innerHTML = "Vous avez raté 3 fois de suite votre score est reduite de 1/5"
            echec.classList.toggle('d-none')
            setTimeout(() => {
                echec.classList.toggle('d-none')
            }, 1500);
        }

        mettreAJourAffichage();
    });

