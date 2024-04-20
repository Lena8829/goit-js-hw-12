import axios from 'axios';

export async function searchImages(query, page = 1, perPage = 15) {
  const apiKey = '43437392-3f8254e7ae10b5746fbcc03c6';

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    return response.data.hits;
  } catch (error) {
    console.log(error);
    return [];
  }
}
