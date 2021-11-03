import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onGalleryItemClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  event.preventDefault();
  const instance = basicLightbox.create(`<img src= "${event.target.dataset.source}" height="600"/>`);
  instance.show();
}

export { onGalleryItemClick };

