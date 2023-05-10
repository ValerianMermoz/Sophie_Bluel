//Recuperation des projets depuis l'api fourni par le backend 
fetch('http://localhost:5678/api/works')
 .then((response) => {
    if(response.ok) return response.json();
 })
 .then ((data)=> {
    console.table(data);
   
    const gallery = document.querySelector('.gallery');
    data.forEach(item => {
        const divOfProjects = document.createElement('div');
        const imageDiv = document.createElement('img');
        imageDiv.src = item.imageUrl;
        
        const figCaption = document.createElement('figcaption');
        figCaption.textContent = item.title;

        divOfProjects.appendChild(imageDiv);
        divOfProjects.appendChild(figCaption);
        gallery.appendChild(divOfProjects);
    });
       
    }).catch((error) => {
        alert("Une erreur est survenue sur le site ! Veuillez contacter l'administrateur! ");
        console.log(error);
    });

    // Charger la liste des categories 
 fetch('http://localhost:5678/api/categories')
 .then((response) => {
    if(response.ok) return response.json();
 })
 .then ((data)=> {
    console.table(data);
   
    const filters = document.querySelector('.filters');
    data.forEach(item => {
      const boutonObjet = document.getElementById("1")

      boutonObjet.addEventListener("click", function() {
         const objetsFiltrees = item.filter(function (data) {
            return data.categoryId == "1";
         });
         console.log(data);
      });
       // ajouter les boutons filters

    });
       
    }).catch((error) => {
        alert("Une erreur est survenue sur le site ! Veuillez contacter l'administrateur! ");
        console.log(error);
    });


