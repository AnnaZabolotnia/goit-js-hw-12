const GALLERY_LINK = 'gallery-link';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(q) {
  const searchParams = new URLSearchParams({
    key: '42391578-00c3b1aea4bb12888c676ccb5',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safeSearch: true,
  });

  const url = BASE_URL + '?' + searchParams.toString();

  return fetch(url).then(response => response.json());
}

export { fetchImages, GALLERY_LINK };
