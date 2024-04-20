import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

//-------------------------------------------------------------------------------------------------

searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (query === '') {
    return;
  }

  showLoader();

  searchImages(query)
    .then(images => {
      hideLoader();

      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        renderImages(images);
      }
    })
    .catch(error => {
      hideLoader();
      console.error(error);
    });
}

hideLoader();

//-----------------------------------------------------------------------------------------
function showLoader() {
  loader.style.display = 'block';
}
// Функция для скрытия индикатора загрузки
function hideLoader() {
  loader.style.display = 'none';
}
//---------------------------------------------------------------------------------------
