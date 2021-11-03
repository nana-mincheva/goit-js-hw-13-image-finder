import imagesTpl from '../templates/template.hbs';
import ImageApiService from './apiService';
import { onGalleryItemClick } from './modal';
import getRefs from './get-refs';
import pnotify from './pnotify';

const refs = getRefs();
const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.imagesContainer.addEventListener('click', onGalleryItemClick);

function onSearch(e) {
  e.preventDefault();
  clearImagesContainer();

  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query.trim() === '') {
    return pnotify.noDataEntered();
  }

  imageApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

async function fetchImages() {
  try {
    const response = await imageApiService.fetchImages();
    const appendImages = appendImagesMarkup(response);
    const mistake = searchError(appendImages);
    return mistake;
  } catch (error) {
    console.log(error);
  }
}

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function searchError() {
  if (refs.imagesContainer.children.length === 0) {
    return pnotify.noMatchesFound();
  }
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageApiService.query !== '') {
      imageApiService.fetchImages().then(images => {
        appendImagesMarkup(images);
        imageApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.watcher);