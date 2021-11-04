import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import PixabayApi from './apiService';
import imagesListTemplate from '../templates/template.hbs';
import { isOpenModal } from './modal';
import getRefs from './refs';

const refs = getRefs();
const api = new PixabayApi();

refs.searchForm.addEventListener('submit', searchImages);
refs.gallery.addEventListener('click', isOpenModal);

function searchImages(event) {
  event.preventDefault();
  api.query = event.currentTarget.elements.query.value;

  if (api.query === '' || api.query === ' ') {
    return error({
      text: 'Please enter a valid search value',
      delay: 2000,
      maxTextHeight: 0,
    });
  }

  api.resetPage();
  clearImage();
  api.fetchImages().then(hits => {
    renderImages(hits);
    api.incrementPage();
  });
}

function renderImages(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesListTemplate(hits));
}

function clearImage() {
  refs.gallery.innerHTML = '';
}

const observerHandler = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && api.query !== '') {
      api.fetchImages().then(img => {
        renderImages(img);
        api.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(observerHandler, {
  rootMargin: '150px',
});

observer.observe(refs.listObserver);