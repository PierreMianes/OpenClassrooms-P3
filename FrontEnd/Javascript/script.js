//APPEL DE L'API ET REMPLACEMENT DE LA GALERIE//

const imagesContainer = document.querySelector('.gallery') /* on crée la variable qui va nous permettre de recrée notre galerie dans la div class="gallery"  */

function createWorkFigure(work) { /* cette fonction permet de crée un work et de l'afficher dans notre div */
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')

  figureImage.src = work.imageUrl /* Apres avoir crée les variables, on les associe au données de l'API */
  figureImage.alt = work.title
  figureCaption.innerHTML = work.title
  figure.setAttribute('data-id', work.id);
  figure.setAttribute('category-id', work.categoryId)
  
  figure.appendChild(figureImage) /* Puis on structure nos work dans notre div avec appendChild */
  figure.appendChild(figureCaption)    

  return figure;
}


fetch('http://localhost:5678/api/works') /* ici l'appel fetch qui permet de recupérer les works via la route works en get */
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createWorkFigure(work);
      imagesContainer.appendChild(figure);
    });
  });

/*PARTIE DES FILTRES*/

/*fonction Objet*/

function filtreObjet() { /* ici c'est la focntion qui va permettre de rendre nos filtre fonctionelle (en l'occurence celui objet ici) */

  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '1') {                /* ici on associe nos variables au categorie de l'API qui sont sous forme de numéro */
      element.style.display = 'block';      
    } else {                          /* et on modifie notre affichage selon la catégorie choisie */
      element.style.display = 'none';
    }
  });
}

var bouton = document.getElementById('boutonObjet');
bouton.addEventListener('click',filtreObjet);


/*fonction Appartements*/

function filtreAppartements() { 

  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '2') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

var bouton = document.getElementById('boutonAppartement');
bouton.addEventListener('click',filtreAppartements);


/*fonction Hôtels & restaurants*/


function filtreHotelsRestaurants() {

  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '3') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

var bouton = document.getElementById('boutonHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);


/*fonction Tous*/


function filtreTous() {

  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    element.style.display = 'block'; /* Pour la fonction tous, pas besoin de caché d'éléments puisqu'on les veut tous affichés */
  });
}

var bouton = document.getElementById('boutonTous');
bouton.addEventListener('click',filtreTous);

/* Fonction qui permet d'attribuer ou non la class "selectione" */

const boutons = document.querySelectorAll('.filtre-bouton');

boutons.forEach((bouton) => {
    bouton.addEventListener('click', function() { /* ici on cherche a ce que le bouton "tous soit enfoncé à l'ouverture du site et qu'il s'enleve lors du choix d'un autre filtre" */
      boutons.forEach((bouton) => {
        bouton.classList.remove('selectione');
      });
      this.classList.add('selectione');
      sessionStorage.setItem('boutonSelectionne', this.id);
    });
});
 
/* Partie qui permet de revenir à "Tous" quand on recharge la page*/

window.onbeforeunload = function(){
sessionStorage.removeItem('boutonSelectionne');
}

/* Défilement plus smooth des navlinks*/

const navLinks = document.querySelectorAll('nav ul a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const href = link.getAttribute('href'); /* Lors que l'on cliquera sur un élément "nav ul a" */

        if (href.startsWith('#')) { /* qui commence par # de maniere a ne pas affecté le login */
           
            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({ behavior: 'smooth' }); /* le défilement deviendra "smooth" */
        }
    });
});

/* PARTIE LOGIN ADMIN */

document.addEventListener("DOMContentLoaded", function() { /* ici on associe chacun des élément potentiellement variable lors de la co de l'admin a une variable */
  const loginStatus = document.getElementById("login");
  const logoutStatus = document.getElementById("logout");
  const adminStatus = document.getElementById("admin-co");
  const portfolioModif = document.getElementById("portfolio-modif2");
  const filtreModif = document.querySelector(".filtre");

  /* AFFICHER LES ELEMENTS SELON LE STATUS DE L'ADMIN */

  if (JSON.parse(sessionStorage.getItem("isConnected"))) { /* et ici on choisi d'afficher ou non qu'est ce qui sera affiché selon le status de l'admin */
      loginStatus.style.display = 'none';
      logoutStatus.style.display = 'block';
      adminStatus.style.display = 'flex';
      portfolioModif.style.display = 'flex';
      filtreModif.style.display = 'none';
  } else {
      loginStatus.style.display = 'block';
      logoutStatus.style.display = 'none';
      adminStatus.style.display = 'none';
      portfolioModif.style.display = 'none';
      filtreModif.style.display = 'flex';
  }

  /* DECONNECTER L'UTILISATEUR */

  logoutStatus.addEventListener("click", (event) => { /* ici on vide le session storage et on revoie l'admin sur l'index lors de la deco */
      event.preventDefault();
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("isConnected");
      window.location.replace("index.html"); 
  });
}); 


/* PARTIE MODALE CATEGORIES */

const selectCategory = document.getElementById('modal-photo-categorie');

const reponseCategory = fetch('http://localhost:5678/api/categories') /* on fait l'appel fetch pour les categories sur la route categories */
.then((response) => response.json())
.then((data) => {
  data.forEach((category) => { /* ici on assosie le titre et la categorie choisie au données de l'API qui devront etre choisie*/
    const categoryOption = document.createElement('option')
    const categoryLabel = document.createElement('label')

    categoryOption.setAttribute('value', category.id)
    categoryLabel.innerHTML = category.name

    selectCategory.appendChild(categoryOption)
    categoryOption.appendChild(categoryLabel) /* et on structure avec appendChild */
  });
});

