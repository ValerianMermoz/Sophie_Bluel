// Variables pour les modales
const modal = document.getElementById("myModal");
const galleryModale = document.querySelector(".modalImg");
const modalFooter = document.querySelector(".modalFooter");
const modalContent = document.getElementById("modal-content");
const modalContentDeux = document.getElementById("modal-contentdeux");
const flecheRetour = document.getElementById("flecheRetour")



// Variables btn pour l'ouverture de la modale
const btn = document.getElementById("buttonEdition");
const btnmodif = document.getElementById("buttonmodif");
const btnmodif2 = document.getElementById("buttonmodif2");

// Variable span pour la fermeture de modale
const span = document.getElementsByClassName("close")[0];

// Quand on clique sur le bouton, ouvre la modale
btn.onclick = function () {
  modal.style.display = "block";
};

btnmodif.onclick = function () {
  modal.style.display = "block";
};

btnmodif2.onclick = function () {
  modal.style.display = "block";
};

// Quand on clique sur le X cela ferme la modale
span.onclick = function () {
  modal.style.display = "none";
};

// Quand on clique nimporte où en dehors de la modale, elle se ferme
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// Quand on clique sur la fleche on revient sur la première modal
flecheRetour.onclick = function () {
  modalContent.style.display = "block";
  modalContentDeux.style.display = "none";
}

// Fonction d'affichage des projets
function modaleGallery(data) {
  for (let i = 0; i < data.length; i++) {
    const divOfImg = document.createElement("figure");
    divOfImg.setAttribute("class", "figModal");
    divOfImg.setAttribute("id", "figMod"+data[i].id);
    const imageDiv = document.createElement("img");
    imageDiv.src = data[i].imageUrl;

    const poubelle = document.createElement("i");
    poubelle.setAttribute("class", "fa-solid fa-trash-can");
    poubelle.addEventListener("click", function(event){
      console.log(data[i].id)
    });
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = "éditer";



    divOfImg.appendChild(imageDiv);
    divOfImg.appendChild(figCaption);
    divOfImg.appendChild(poubelle);
    galleryModale.appendChild(divOfImg);
  }

  const boutonAjout = document.createElement("button");
  boutonAjout.setAttribute("class", "boutonajout");
  boutonAjout.setAttribute("id", "Ajout");
  boutonAjout.textContent = "Ajouter une photo";
  boutonAjout.addEventListener("click", function() {
    modalContent.style.display = "none";
    modalContentDeux.style.display = "block";
    });

  const supprGalerie = document.createElement("p");
  supprGalerie.textContent = "Supprimer la galerie"

  modalFooter.appendChild(boutonAjout);
  modalFooter.appendChild(supprGalerie);

}


//Recuperation des projets depuis l'api fourni par le backend
async function generateModaleGallery() {
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
      allProjects = data;
      modaleGallery(allProjects);
    })

    .catch((error) => {
      alert(
        "Une erreur est survenue sur le site ! Veuillez contacter l'administrateur! "
      );
      console.log(error);
    });
}

// // Suppresion d'un ou plusieurs projets
// poubelle.addEventListener("click", supprimeImage);

// function supprimeImage() {

//   fetch ('http://localhost:5678/api/works/${id}', {
//     method : 'DELETE',
//   })
// }





async function initModale() {
  await generateModaleGallery();
}

initModale();
