/**Variable pour remplir les champs email et mot de passe */
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
    /**Appel FETCH de l'API */
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
      sessionStorage.setItem('jeton', jeton);
      window.location.href="http://127.0.0.1:5500/FrontEnd/index.html";
      
    }
    else {
      alert("Erreur dans l’identifiant ou le mot de passe");
    }
  });
