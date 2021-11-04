import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function isOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  const showImage = `<img src=${event.target.dataset.source}>`;
  const showedImage = basicLightbox.create(showImage);
  showedImage.show();
}

export { isOpenModal };
