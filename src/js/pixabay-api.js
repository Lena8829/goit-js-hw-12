export async function searchImages(query) {
  const apiKey = '43437392-3f8254e7ae10b5746fbcc03c6';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data.hits; // повертаємо масив зображень
    })
    .catch(error => {
      console.log(error);
      return []; // повертаємо пустий масив якщо помилка
    });
}
