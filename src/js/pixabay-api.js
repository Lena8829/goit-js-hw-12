//*функція для HTTP-запиту
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43437392-3f8254e7ae10b5746fbcc03c6';

export const searchImages = async (query, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page: 15,
        safesearch: true,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
};
