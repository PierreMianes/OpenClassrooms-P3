/* LOGIN POUR L'ADMIN */

const element = { /* On crée les variable qui vont nous permettre de lier les données de l'API au id */
    password: document.querySelector('#password'), 
    email: document.querySelector('#email'),
    submit: document.querySelector('#submitInfo'),
};

let boutonLogin = element.submit.addEventListener("click", (a) => {
    a.preventDefault();


    fetch("http://localhost:5678/api/users/login", { /* Appel a l'API sur la route login */
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            email : element.email.value,
            password: element.password.value,
        }),
        })
        .then((response) => response.json ())
        .then((data) => {
            sessionStorage.setItem("Token", data.token); /* On recupere le token dans le session storage */

            if (data.message || data.error) {
                alert(`Erreur dans l'identifiant ou le mot de passe`); /* Message d'erreur dans l'identifiant */
            } else {
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html"); /* Si les identifiants sont bon, envoie vers la page d'edit  */
            }
        })
});

