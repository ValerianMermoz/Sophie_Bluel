// Verfier que les champs login et pwd son bien remplis et puis passer vers la fonction login

// async function Login(){
// fetch ('http://localhost:5678/api/users/login', {
//     method: "POST",
//     headers: {
//         'Content-type' : 'application/json',
//         'accept' : 'application/json'
//     },
//     body: {
//         "email": document.getElementById('email').value,
//         "password": document.getElementById('password').value
//       }
// })
//     .then(res => console.log(res))}

const loginBtn = document.querySelector(".login")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const loginMail = document.querySelector(".email").value;
    const loginPass = document.querySelector(".password").value;

    const loginID = {
      email: loginMail,
      password: loginPass,
    };

    const loginOk = JSON.stringify(loginID);

    const login = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: loginOk,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      
    });
    /** Réponse */
    const jeton = await login.json();

    if (login.ok) {
      alert(jeton.token);
      window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";
      
    }
    else {
      alert("Erreur dans l’identifiant ou le mot de passe");
    }
  });
