const modal = document.querySelector('#modal')
const modalContenu = document.querySelector('#modal-contenu')
const modalPhoto = document.querySelector('#modal-photo')
const modalClose = document.querySelector('#modal-close')
const modifier = document.querySelector('#portfolio-modif2')

function showModal() {
    modal.classList.add('modal-open');
    modal.style.display = 'block';
    modalContenu.style.display = 'block';
    modalPhoto.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Empêche le défilement de la page principale
    document.addEventListener('wheel', preventModalScroll, { passive: false }); // Écoute l'événement de la molette de la souris
}

function hideModal () {
    modal.style.display = 'none';
    isSecondFormVisible = false;
    document.body.style.overflow = ''; // Restaure le défilement de la page principale
    document.removeEventListener('wheel', preventModalScroll); // Arrête d'écouter l'événement de la molette de la souris
}

function preventModalScroll(event) {
    if (modal.classList.contains('modal-open')) {
        event.preventDefault(); // Empêche le comportement par défaut de la molette de la souris si la modale est ouverte
    }
}

modalContenu.addEventListener('click', function(e) {
    e.stopPropagation();
});

modalPhoto.addEventListener('click', function(e) {
    e.stopPropagation();
});

modalClose.addEventListener('click', hideModal);

modifier.addEventListener('click', showModal);

document.addEventListener('click', function(e) {
    if (e.target === modal) {
        hideModal();
    }
});

/* Modal Navigation entre étapes */



const newPhotoBouton = document.querySelector('#ajout-photo');
const retourBouton = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector('#modal-photo-close');

newPhotoBouton.addEventListener('click', function() {
    modalContenu.style.display = 'none';
    modalPhoto.style.display = 'block';
})

retourBouton.addEventListener('click', function() {
    modalContenu.style.display = 'block';
    modalPhoto.style.display = 'none';
})

modalPhotoClose.addEventListener('click', hideModal);

/* AJOUTER LA GALERIE A LA MODALE */

const workModalContainer = document.querySelector('.gallery-modal')

function createModalWorkFigure(work) {
    const figure = document.createElement('figure')
    const figureCaption = document.createElement('figcaption')
    const figureImage = document.createElement('img')
    const deleteIcon = document.createElement('i')

    figureImage.src = work.imageUrl
    figureImage.alt = work.title
    figureCaption.innerHTML = ""
    figure.setAttribute ('data-id', work.id)
    deleteIcon.className = "fa-regular fa-trash-can"

    figure.appendChild(figureImage)
    figure.appendChild(figureCaption)
    figure.appendChild(deleteIcon)

    deleteIcon.addEventListener('click', (event) => {
        event.preventDefault();
        deleteWorkById(work.id);
      });

    return figure;
}

fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((work) => {
            const figure = createModalWorkFigure(work);
            workModalContainer.appendChild(figure)
        })
    })

/* SUPPRIMER UNE OEUVRE DE LA GALERIE */

function deleteWorkById(workId) {
    const token = sessionStorage.getItem("Token")
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?")
    if (confirmation) {
        fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(response => {
        if (!response.ok){
        throw new error ('La supression du travai à echoué.');
      }
      const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
      if (modalWorkToRemove) {
        modalWorkToRemove.remove();
        
      const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
      if (galleryWorkToRemove) {
          galleryWorkToRemove.remove();
      } else {
          console.error('Élément à supprimer non trouvé dans la galerie principale');
        }
      } else {
          console.error('Élément à supprimer non trouvé dans la modale');
      }
    })
    .catch(error => console.error(error));
    }    
  }

/* CONDITION POUR AJOUTER UNE OEUVRE*/

document.addEventListener('DOMContentLoaded', function() {
    checkForm();
});

const titreInput = document.getElementById('modal-photo-titre');
const categorieSelect = document.getElementById('modal-photo-categorie');
const imageInput = document.getElementById('image');
const validerButton = document.getElementById('modal-photo-valider');

function checkForm() {
    if (titreInput.value !== '' && categorieSelect.value !== '' && imageInput.value !== '') {
        validerButton.style.backgroundColor = '#1D6154';
      } else {
        validerButton.style.backgroundColor = '#A7A7A7';
        }  
}
    imageInput.addEventListener("change", function () {
    const selectedImage = imageInput.files[1];

    /* Vérifier si une image a été sélectionnée */
    if (selectedImage) {
        /* Vérifier l'extension du fichier*/
        const fileName = selectedImage.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
                    /* Réinitialiser la valeur de l'input file pour permettre à l'utilisateur de sélectionner une autre image*/
                    imageInput.value = '';
                    /* L'extension est correcte, activer le bouton de validation*/
                    validerButton.disabled = false;
                } else {
                    /* L'extension n'est pas correcte, désactiver le bouton de validation*/
                    validerButton.disabled = true;
                    alert("Veuillez choisir une image au format JPG ou PNG.");
                    /* Réinitialiser la valeur de l'input file pour empêcher le téléchargement du fichier*/
                    imageInput.value = '';
                }

        if (selectedImage.size > 4 * 1024 * 1024) {
                        /* La taille de l'image dépasse 4 Mo, afficher un message d'alerte*/
                        alert("La taille de l'image ne doit pas dépasser 4 Mo.");
                        /* Réinitialiser la valeur de l'input file pour permettre à l'utilisateur de sélectionner une autre image*/
                        imageInput.value = '';
                        /* Désactiver le bouton de validation*/
                        validerButton.disabled = true;
                    } else {
                        /* La taille de l'image est acceptable, activer le bouton de validation*/
                        validerButton.disabled = false;
                    }
    }
});

titreInput.addEventListener('input', checkForm);
categorieSelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);
validerButton.addEventListener('click', addNewWork);

/* AJOUTER UNE NOUVELLE OEUVRE */

function addNewWork(event) {

    event.preventDefault();

    const token = sessionStorage.getItem("Token")

    const titre = document.getElementById("modal-photo-titre").value;
    const categorie = document.getElementById("modal-photo-categorie").value;
    const image = document.getElementById("image").files[0];

    /* checker si tout les champ sont remplie (e1) */

    if(!titre || !categorie || !image) {
        alert('Veuillez remplir tout les champs de ce formulaire.')
        return;
    }

    const formData = new FormData();
  formData.append("title", titre);
  formData.append("category", categorie);
  formData.append("image", image);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      "Accept" : 'application/json', 
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(reponse => reponse.json())
  .then(work => {

    /* Ajout réussi, réinitialisation du formulaire */
    document.getElementById("modal-photo-titre").value = "";
    document.getElementById("modal-photo-categorie").selectedIndex = 0;
    document.getElementById("image").value = '';

    /* ajouter la nouvelle oeuvre à la galerie*/
    const figure = createWorkFigure(work);
    const gallery = document.querySelector('.gallery');
    gallery.appendChild(figure);

    /* ajouter la nouvelle oeuvre à la modale*/
    const figureModal = createModalWorkFigure(work);
    const galleryModal = document.querySelector('.gallery-modal');
    galleryModal.appendChild(figureModal);

    // Fermer la modale une fois l'ajout réussi
    hideModal();

  })
  .catch(error => console.error(error));
}

/* PREVIEW DE L'IMAGE CHOISIE */

const inputImage = document.getElementById("image");
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo > p");
const iconeImage = document.querySelector("#iModalImage");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.maxHeight = "100%";
  imgPreview.style.width = "auto";

  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iModalImage.style.display = "none";
  document.getElementById("form-photo").appendChild(imgPreview);
});

