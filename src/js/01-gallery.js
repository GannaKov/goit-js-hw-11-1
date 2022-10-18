// Add imports above this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix';
import { Report } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
// Change code below this line
// import { createImgMarkup } from './customFunction/functionRender';
const galleryDiv = document.querySelector('.gallery');
// const imgMarkup = createImgMarkup(galleryItems);
// galleryDiv.insertAdjacentHTML('beforeend', imgMarkup);

import axios from 'axios';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
// import './css/styles.css';
const BASEURL = 'https://pixabay.com/api/';
const keyApiPix = '30040272-179178153c29e3da83ceec1ea';
// inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(evt) {
//https://pixabay.com/api/?key=30040272-179178153c29e3da83ceec1ea&q=cat&image_type=photo&orientation=horizont&safesearch=true
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};
refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let inputValue = evt.target.elements.searchQuery.value.toLowerCase().trim();

  fetchPhotos(inputValue)
    .then(response => {
      // console.log(response.data.hits);
      const imgMarkUp = createSmallImgMarkup(response.data.hits);
      refs.galleryEl.insertAdjacentHTML('beforeend', imgMarkUp);
    })
    .catch(error => console.log(error));
}
async function fetchPhotos(keyWord) {
  const response = await axios.get(
    `${BASEURL}?key=${keyApiPix}&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  return response;
}
function createSmallImgMarkup(arrPhotos) {
  return arrPhotos
    .map(
      ({
        largeImageURL,
        previewURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        // console.log(photo);
        return `<div class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
            <img class="gallery__image" src="${previewURL}" alt="${tags}" />
         </a>
         <p class="gallery__text">Likes ${likes}</p>
         <p class="gallery__text">Views ${views}</p>
         <p class="gallery__text">Comments ${comments}</p>
          <p class="gallery__text">Downloads ${downloads}</p>
    </div>`;
      }
    )
    .join('');
}
