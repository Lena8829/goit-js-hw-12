//*функція для відображення картинок

import SimpleLightbox from 'simplelightbox'; //
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {});

// відображення картинок---------------------------------------------------------------------
export const renderImages = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <div class='card'>
      <a class="card-item" href="${largeImageURL}">
        <img class="card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        
        <div class="card-info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
      </div>

    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
};
