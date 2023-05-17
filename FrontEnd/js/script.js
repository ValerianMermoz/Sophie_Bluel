const gallery = document.querySelector(".gallery");
let allProjects = [];
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
      allProjects= data;
      Gallery(allProjects);
      
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
      const filters = document.querySelector(".filters");

      const button = document.createElement("button");
        button.setAttribute("class","filter");
        button.setAttribute("id","0");
        button.textContent = "Tous";
        button.addEventListener("click", function () {
          
          gallery.innerHTML = "";
          Gallery(allProjects);
          
        });
        filters.appendChild(button);

      data.forEach(element => {
        
        const button = document.createElement("button");
        button.setAttribute("class","filter");
        button.setAttribute("id",element.id);
        button.textContent = element.name;
        button.addEventListener("click", function () {
          
          const filteredProjects = allProjects.filter((project) => project.categoryId === element.id);
          gallery.innerHTML = "";
          Gallery(filteredProjects);
          
        });

        filters.appendChild(button);

      });

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
