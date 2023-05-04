//Code ajout des projets
let data = fetch('http://localhost:5678/api/works')
 .then(response => (response.json()))
 .then ((data)=> {
    console.table(data);
    const gallery = document.querySelector('.gallery');
    data.forEach(items => {
        const divOfProjects = document.createElement('div');
        const imageDiv = document.createElement('img');
        divOfProjects.innerHTML = items.title;
        imageDiv.src = items.imageUrl;
        gallery.appendChild(divOfProjects);
        divOfProjects.appendChild(imageDiv);
    });

   /* fetch ('http://localhost:5678/api/works')
        .then(response => (response.json()))
        .then((categories) => {
            console.log(categories);

            const filter1 = document.querySelector(".filter")

            filter1.addEventListener("click", function(){
                const
            })
        });*/

 });

 const filters = document.querySelectorAll('.filters div');


 [
    {
      "id": 1,
      "name": "Objets"
    },
    {
      "id": 2,
      "name": "Appartements"
    },
    {
      "id": 3,
      "name": "Hotels & restaurants"
    }
  ]
