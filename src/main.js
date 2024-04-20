import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

//-------------------------------------------------------------------------------------------------

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-btn');

//-------------------------------------------------------------------------------------------------
let currentPage = 1;
const perPage = 15;

searchForm.addEventListener('submit', handleSubmit);

//--------------------------------------------------------------------------------------------------

async function handleSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (query === '') {
    return;
  }

  showLoader();

  try {
    const data = await searchImages(query, currentPage, perPage);
    const images = data.hits;
    // hideLoader();

    renderImages(images);
  } catch (error) {
    console.log(error);

    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

// hideLoader();

//---------------------------------------------------------------------------------------
// Функція для завантаження додаткових зображень
async function loadMoreImages(query) {
  currentPage++; // Збільшуємо номер сторінки

  loadMoreButton.disabled = true;

  try {
    const data = await searchImages(query, currentPage, perPage);
    const images = data.hits; // Отримуємо зображення з даних
    renderImages(images); // Відображаємо зображення
    checkEndOfCollection(data.totalHits);
    smoothScroll();
  } catch (error) {
    console.log(error);
  }
}
loadMoreButton.addEventListener('click', () => {
  const query = searchInput.value.trim(); // Отримуємо значення поля вводу
  loadMoreImages(query); // Викликаємо функцію для завантаження додаткових зображень
});

//-----------------------------------------------------------------------------------------
//показуєм індикатор
function showLoader() {
  loader.style.display = 'block';
}
//скриваємо індикатор
function hideLoader() {
  loader.style.display = 'none';
}

// Функція для перевірки кінця колекції та приховування кнопки "Load more"
function checkEndOfCollection(totalHits) {
  const totalLoaded = currentPage * perPage;
  if (totalLoaded >= totalHits) {
    loadMoreButton.style.display = 'none'; // Ховаємо кнопку
  }
}

// Викликаємо функцію після відображення кожної нової порції зображень
checkEndOfCollection(totalHits); // `totalHits` - загальна кількість зображень у відповіді від сервера

//----------------------------------------------------------------------------------------------

// Функція для плавної прокрутки сторінки
function smoothScroll() {
  // Отримуємо висоту однієї карточки зображення
  const cardHeight = document
    .querySelector('.card')
    .getBoundingClientRect().height;
  // Прокручуємо сторінку вниз на дві висоти карточки
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}

// Викликаємо функцію для плавної прокрутки після завантаження нових зображень
smoothScroll();
