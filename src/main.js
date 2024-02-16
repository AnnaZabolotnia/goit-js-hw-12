import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages, GALLERY_LINK } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';

import './js/pixabay-api.js';
import './js/render-functions.js';

const galleryContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loaderContainer = document.querySelector('.loader');
const resultInfo = document.querySelector('.result-info');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const queryInput = event.target.elements.query.value.trim();

  if (queryInput.length < 3) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query with at least 3 characters.',
      position: 'topRight',
    });
    return;
  }

  galleryContainer.innerHTML = '';
  resultInfo.innerHTML = '';

  const lightbox = new SimpleLightbox(`.${GALLERY_LINK}`);

  fetchImages(queryInput)
    .then(({ hits }) => {
      if (hits.length > 0) {
        const galleryHTML = hits.map(createGallery).join('');
        galleryContainer.innerHTML = galleryHTML;

        resultInfo.innerHTML = `<p class="result-messages">Loading images, please wait...</p>`;

        lightbox.refresh();

        setTimeout(() => {
          resultInfo.innerHTML = '';
        }, 2000);
      } else {
        resultInfo.innerHTML =
          '<p class="no-results-message">No images found.</p>';

        setTimeout(() => {
          resultInfo.innerHTML = '';
        }, 5000);
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Error fetching images. Please try again.',
        position: 'topRight',
      });
    })
    .finally(() => {
      loaderContainer.style.display = 'none';
      searchForm.reset();
    });
});
