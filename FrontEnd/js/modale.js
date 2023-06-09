// Variables pour les modales
const modal = document.getElementById("myModal");
const galleryModale = document.querySelector(".modalImg");
const modalFooter = document.querySelector(".modalFooter");
const modalContent = document.getElementById("modal-content");
const modalContentDeux = document.getElementById("formAjout");
const flecheRetour = document.getElementById("flecheRetour");
const submit = document.getElementById("btnValider");

// Variables btn pour l'ouverture de la modale
const btn = document.getElementById("buttonEdition");
const btnmodif = document.getElementById("buttonmodif");
const btnmodif2 = document.getElementById("buttonmodif2");

// Variable span pour la fermeture de modale
const span = document.getElementsByClassName("close")[0];

// Quand on clique sur le bouton, ouvre la modale
btn.onclick = function () {
  openModale();
};

btnmodif.onclick = function () {
  openModale();
};

btnmodif2.onclick = function () {
  openModale();
};

function openModale() {
  modal.style.display = "block";
  modaleGallery(allProjects);
}
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
};

function createFigureModale(projet) {
  const divOfImg = document.createElement("figure");
  divOfImg.setAttribute("class", "figModal");
  divOfImg.setAttribute("id", "figMod" + projet.id);
  const imageDiv = document.createElement("img");
  imageDiv.src = projet.imageUrl;

  /**Suppresion d'une image du projet */
  const poubelle = document.createElement("i");
  poubelle.setAttribute("class", "fa-solid fa-trash-can");
  poubelle.setAttribute("id", "trash");

  poubelle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const confirmation = confirm(
      "Etes vous sûr de vouloir supprimer ce projet !"
    );
    if (confirmation) {
      const projetId = projet.id;
      // Supprime le projet depuis l'API
      deleteImage(projetId);
    }
  });
  const figCaption = document.createElement("figcaption");
  figCaption.textContent = "éditer";

  divOfImg.appendChild(imageDiv);
  divOfImg.appendChild(figCaption);
  divOfImg.appendChild(poubelle);

  return divOfImg;
}
// Fonction d'affichage des projets
function modaleGallery(data) {
  galleryModale.innerHTML = "";
  modalFooter.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const divOfImg = createFigureModale(data[i]);
    galleryModale.appendChild(divOfImg);
  }

  const boutonAjout = document.createElement("button");
  boutonAjout.setAttribute("class", "boutonajout");
  boutonAjout.setAttribute("id", "Ajout");
  boutonAjout.textContent = "Ajouter une photo";
  boutonAjout.addEventListener("click", function () {
    modalContent.style.display = "none";
    modalContentDeux.style.display = "block";
  });

  const supprGalerie = document.createElement("p");
  supprGalerie.textContent = "Supprimer la galerie";

  modalFooter.appendChild(boutonAjout);
  modalFooter.appendChild(supprGalerie);
}
//* Suppresion d'un projet *//
function deleteImage(imageId) {
  const token = localStorage.getItem(`token`);
  fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: `DELETE`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status == 204) {
        // L'élement à bien été supprimé de la base de donnnées
        //Actualiser le tableau global de mes projets
        allProjects = allProjects.filter((projet) => projet.id != imageId);
        //Supprimer depuis la page index le projet avec id = imageId
        document.getElementById("figMod" + imageId).remove();
        //Supprimer depuis la modale la figure du projet avec id= imageId
        document.getElementById("fig" + imageId).remove();
      }
      if (response.status == 401) {
        alert("Vous n'etes pas autorisé de supprimer le projet !");
      }
    })
    .catch((error) => {
      alert("Le projet à bien été supprimé !");
      console.log(error);
    });
}

/* Ajout d'image*/
function previewImage(e) {
  const imagePreview = document.getElementById("imgAjout");
  const removeImageButton = document.querySelector(".removeImageButton");
  const file = e.target.files[0]; // Vérifie si un fichier a été sélectionné
  if (file) {
    if (file.type.match("image.*")) {
      if (file.size <= 4194304) {
        // Verifier la taille de l'image
        const reader = new FileReader();
        reader.onload = function (event) {
          imagePreview.src = event.target.result;
          imagePreview.style.width = "100%";
          imagePreview.style.objectFit = "cover";
          imagePreview.style.display = "block";
          document.querySelector(".fa-image").style.display = "none";
          document.getElementById("buttonloadFile").style.display = "none";
          document.getElementById("file").style.display = "none";
          document.querySelector(".detailsImg").style.display = "none";
          removeImageButton.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        alert("Le fichier dépasse la taille maximale autorisée de 4 Mo.");

        imagePreview.style.display = "none";
        document.querySelector(".fa-image").style.display = "block";
        document.getElementById("buttonloadFile").style.display = "block";
        document.getElementById("file").style.display = "block";
        document.querySelector(".detailsImg").style.display = "block";
        removeImageButton.style.display = "none";
      }
    } else {
      alert("Le fichier sélectionné n'est pas une image.");
      imagePreview.style.display = "none";
      document.querySelector(".fa-image").style.display = "block";
      document.getElementById("buttonloadFile").style.display = "block";
      document.getElementById("file").style.display = "block";
      document.querySelector(".detailsImg").style.display = "block";
      removeImageButton.style.display = "none";
    }
  } else {
    imagePreview.style.display = "none";
    document.querySelector(".fa-image").style.display = "block";
    document.getElementById("buttonloadFile").style.display = "block";
    document.getElementById("file").style.display = "block";
    document.querySelector(".detailsImg").style.display = "block";
    removeImageButton.style.display = "none";
  }
  removeImageButton.addEventListener("click", (e) => {
    e.preventDefault();
    imagePreview.style.display = "none";
    document.querySelector(".fa-image").style.display = "block";
    document.getElementById("buttonloadFile").style.display = "block";
    document.getElementById("file").style.display = "block";
    document.querySelector(".detailsImg").style.display = "block";
    removeImageButton.style.display = "none";
  });
}

//* Ajout d'un nouveau projet *//
function modaleAddNewWork() {
  const image = document.getElementById("file");
  const titre = document.getElementById("title");
  const category = document.getElementById("category");
  modalContentDeux.addEventListener("submit", (event) => {
    event.preventDefault();
    const token = localStorage.getItem(`token`);
    const formData = new FormData();
    formData.append("title", titre.value);
    formData.append("category", category.value);
    formData.append("image", image.files[0]);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status == 201) return response.json();
        if (response.status == 400)
          alert("Veuillez insérer un titre et sélectionner une catégorie!");
        if (response.status == 401) alert("Vous n'êtes pas autorisé!");
        if (response.status == 500) alert("Veuillez insérer une image!");
      })
      .then((newObj) => {
        const newProjet = createFigureModale(newObj);
        galleryModale.appendChild(newProjet);
        modal.style.display = "none";
        modalContent.style.display = "block";
        modalContentDeux.style.display = "none";
        allProjects.push(newObj);

        gallery.innerHTML = "";
        Gallery(allProjects);
      })
      .catch((error) => {});
  });
}

modaleAddNewWork();
