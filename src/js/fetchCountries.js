import Notiflix from 'notiflix';

const fields = 'name,capital,population,flags,languages';
const url = 'https://restcountries.com/v3.1/name/';
function fetchCountries(name) {
  return fetch(`${url}${name}?fields=${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
