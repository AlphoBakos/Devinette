const passwordInput = document.querySelector('input[name="password"]');

document.getElementById("form-inscription")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const nomUtilisateur = document.getElementById("username").value;
        const photo = document.getElementById("photo");
        const mdp = document.getElementById("motDePasse").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        users.map(user => {
            if (user.nomUtilisateur == nomUtilisateur) {

                return
            }
        })

        const lire = new FileReader();
        lire.onload = function (event) {
            const image = event.target.result;


            const user = {
                nomUtilisateur: nomUtilisateur,
                mdp: mdp,
                photo: image,
                score: 0
            }

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        };


        lire.readAsDataURL(photo.files[0])
        window.location.pathname = "../"
    });

