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
.addEventListener("click", async function () {

    const loginMail = document.querySelector(".email").value;
    const loginPass = document.querySelector(".password").value;

    const loginID = {
      email: loginMail,
      password: loginPass
    };

    const loginReqID = JSON.stringify(loginID);

    const login = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"},
        body: loginReqID
    })

    const token = await login.json();

        if (login.ok !== true) {
        alert("User not found")
    }
    console.log(token);
});