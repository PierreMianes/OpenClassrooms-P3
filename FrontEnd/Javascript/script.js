//APPEL DE L'API ET REMPLACEMENT DE LA GALERIE//

const imagesContainer = document.querySelector('.gallery')

function createWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')

  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = work.title
  figure.setAttribute('data-id', work.id);
  figure.setAttribute('category-id', work.categoryId)
  
  figure.appendChild(figureImage)
  figure.appendChild(figureCaption)    

  return figure;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createWorkFigure(work);
      imagesContainer.appendChild(figure);
    });
  });

/*PARTIE DES FILTRES*/

/*fonction Objet*/

function filtreObjet() {

  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    const categoryId = element.getAttribute('category-id')
    if (categoryId === '1') {
      element.style.display = 'block';
    } else {
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
    element.style.display = 'block';
  });
}

var bouton = document.getElementById('boutonTous');
bouton.addEventListener('click',filtreTous);

/* Fonction qui permet d'attribuer ou non la class selected*/

const boutons = document.querySelectorAll('.filtre-bouton');

boutons.forEach((bouton) => {
    bouton.addEventListener('click', function() {
      boutons.forEach((bouton) => {
        bouton.classList.remove('selectione');
      });
      this.classList.add('selectione');
      sessionStorage.setItem('boutonSelectionne', this.id);
    });
});
 
/* Partie qui permet de revenir a "Tous" quand on recharge la page*/

window.onbeforeunload = function(){
sessionStorage.removeItem('boutonSelectionne');
}

/* Défilement plus smooth des navlinks*/

const navLinks = document.querySelectorAll('nav ul a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
           
            event.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* PARTIE LOGIN ADMIN */

document.addEventListener("DOMContentLoaded", function() {
  const loginStatus = document.getElementById("login");
  const logoutStatus = document.getElementById("logout");
  const adminStatus = document.getElementById("admin-co");
  const portfolioModif = document.getElementById("portfolio-modif2");
  const filtreModif = document.querySelector(".filtre");

  /* AFFICHER LES ELEMENTS SELON LE STATUS DE L'ADMIN */
  
  if (JSON.parse(sessionStorage.getItem("isConnected"))) {
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
  logoutStatus.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("isConnected");
      window.location.replace("index.html");
  });
});


