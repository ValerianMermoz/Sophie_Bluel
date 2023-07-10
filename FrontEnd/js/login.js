/**Variable pour remplir les champs email et mot de passe */
document.querySelector(".login")
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
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: loginOk,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      
    }).then((response) =>{
      console.log(response);
     if(response.ok) return response.json();
     else{
    if(response.status == 401) alert("Vous n'etes pas autorisé!");
    if(response.status == 404) alert("Veuillez verifier votre login et pwd!");
  }
  })
    .then((data) =>{
      if(data){
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('token', data.token);
      window.location.href="./index.html";
    }
      
    })
    .catch((error) =>{
      console.log(error);
      
    })
    
  });

  logout.addEventListener("click", function() {
    window.localStorage.removeItem("token");
    window.location.href="./index.html";
 });

 saveToken = function() {
  const logout = document.getElementById("logout");
  const login = document.getElementById("login");

  if (window.localStorage.getItem("token")) {
    login.style.display = "none";
  } else {
    logout.style.display = "none";
    login.style.display = "flex";
  }
 }

 saveToken();