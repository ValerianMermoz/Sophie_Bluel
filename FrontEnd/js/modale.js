// Get the modal
const modal = document.getElementById("myModal");
const galleryModale = document.querySelector(".modalImg");
const modalFooter = document.querySelector(".modalFooter");
const modalContent = document.getElementById("modal-content");
const modalContentDeux = document.getElementById("modal-contentdeux");
const flecheRetour = document.getElementById("flecheRetour")



// Get the button that opens the modal
const btn = document.getElementById("buttonEdition");
const btnmodif = document.getElementById("buttonmodif");
const btnmodif2 = document.getElementById("buttonmodif2");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

btnmodif.onclick = function () {
  modal.style.display = "block";
};

btnmodif2.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
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

function modaleGallery(data) {
  for (let i = 0; i < data.length; i++) {
    const divOfImg = document.createElement("figure");
    const imageDiv = document.createElement("img");
    imageDiv.src = data[i].imageUrl;

    const poubelle = document.createElement("i");
    poubelle.setAttribute("class", "fa-solid fa-trash-can");

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

async function initModale() {
  await generateModaleGallery();
}

initModale();
