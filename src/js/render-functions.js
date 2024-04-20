//*функції для відображення елементів інтерфейсу

import SimpleLightbox from 'simplelightbox'; //
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

// відображення картинок---------------------------------------------------------------------
export function renderImages(images) {
  gallery.innerHTML = ''; // Очищуєм галерею перед додаванням нових зображ.

  images.forEach(image => {
    const card = createImageCard(image); // створюєм  та добавляємо картку

    card.addEventListener('click', () => {
      openModal(image);
    });
    gallery.appendChild(card);
  });
}

//створення картки----------------------------------------------------------------------------
function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const imgLink = document.createElement('a'); // Огортаємо зображ.у посилання
  imgLink.href = image.largeImageURL; // велике зображ.
  imgLink.setAttribute('data-lightbox', 'gallery'); //  атрибут для роботи з SimpleLightbox

  const likes = document.createElement('span');
  likes.textContent = `Likes: ${image.likes}`;

  const views = document.createElement('span');
  views.textContent = `Views: ${image.views}`;

  const comments = document.createElement('span');
  comments.textContent = `Comments: ${image.comments}`;

  const downloads = document.createElement('span');
  downloads.textContent = `Downloads: ${image.downloads}`;

  card.appendChild(img);
  card.appendChild(imgLink);
  card.appendChild(likes);
  card.appendChild(views);
  card.appendChild(comments);
  card.appendChild(downloads);

  return card;
}

// відкриття великого зображення---------------------------------------------------------------
export function openModal(image) {
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.open();
  lightbox.refresh();
}
