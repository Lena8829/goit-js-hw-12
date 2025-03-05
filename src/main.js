import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

//-------------------------------------------------------------------------------------------------

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const backdrop = document.querySelector('.backdrop');
const loadMoreBtn = document.querySelector('.load-more');
//-------------------------------------------------------------------------------------------------

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', onClick);

let page = 1;
let query = null;

async function handleSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = ''; // Очищуєм галерею перед додаванням нових зображ.

  query = searchInput.value.trim();
  if (query === '') {
    return;
  }

  loader.classList.remove('hidden');
  backdrop.classList.remove('hidden');

  try {
    const images = await searchImages(query, page);
    if (images.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 5000,
      });
    } else {
      renderImages(images.hits);

      if (images.total >= 15) {
        loadMoreBtn.classList.remove('hidden');
      }
    }

    loader.classList.add('hidden');
    backdrop.classList.add('hidden');
  } catch (error) {
    console.log(error);
  }

  searchForm.reset();
}

async function onClick() {
  loader.classList.remove('hidden');
  backdrop.classList.remove('hidden');

  page += 1;

  try {
    const images = await searchImages(query, page);
    renderImages(images.hits);

    //функція для скролу--------------

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    // -------------------------------------
    loader.classList.add('hidden');
    backdrop.classList.add('hidden');

    const lastPage = Math.ceil(images.totalHits / 15);

    if (lastPage === page) {
      loadMoreBtn.classList.add('hidden');

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
