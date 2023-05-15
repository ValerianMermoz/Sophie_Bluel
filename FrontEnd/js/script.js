const gallery = document.querySelector(".gallery");

//Fonction qui crée la gallerie d'images
function Gallery(data) {
  for (let i = 0; i < data.length; i++) {
    const divOfProjects = document.createElement("div");
    const imageDiv = document.createElement("img");
    imageDiv.src = data[i].imageUrl;

    const figCaption = document.createElement("figcaption");
    figCaption.textContent = data[i].title;

    divOfProjects.appendChild(imageDiv);
    divOfProjects.appendChild(figCaption);
    gallery.appendChild(divOfProjects);
  }

  //Listener filtre uniquement les objets
}

//Recuperation des projets depuis l'api fourni par le backend
async function generategallery() {
  await fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      console.table(data);
      Gallery(data);
      const Tous = document.getElementById("0");
      Tous.addEventListener("click", function () {
        gallery.innerHTML = "";
        Gallery(data);
      });
      const Objets = document.getElementById("1");
      Objets.addEventListener("click", function () {
        const filter = data.filter((datas) => datas.categoryId === 1);
        gallery.innerHTML = "";
        Gallery(filter);
        console.log(filter);
      });
      const Appartements = document.getElementById("2");
      Appartements.addEventListener("click", function () {
        const appartements = data.filter((datas) => datas.categoryId === 2);
        gallery.innerHTML = "";
        Gallery(appartements);
        console.log(Appartements);
      });
      const Hôtels = document.getElementById("3");
      Hôtels.addEventListener("click", function () {
        const hôtels = data.filter((datas) => datas.categoryId === 3);
        gallery.innerHTML = "";
        Gallery(hôtels);
        console.log(Hôtels);
      });
    })

    .catch((error) => {
      alert(
        "Une erreur est survenue sur le site ! Veuillez contacter l'administrateur! "
      );
      console.log(error);
    });
}

// Charger la liste des categories
async function Filtres() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (response.ok) return response.json();
    })
    // ajouter les boutons filters
    .then((data) => {
      console.table(data);
      const Filters = document.querySelector(".filters");
      Filters.innerHTML =
        '<button class="filter" id="0">Tous</button>' +
        data
          .map(
            (data) =>
              `<button class='filter' id=${data.id}>${data.name}</button>`
          )
          .join("");
    })

    .catch((error) => {
      alert(
        "Une erreur est survenue sur le site ! Veuillez contacter l'administrateur! "
      );
      console.log(error);
    });
}

async function init() {
  await Filtres();
  await generategallery();
}

init();
