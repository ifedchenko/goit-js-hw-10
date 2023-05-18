import Notiflix from 'notiflix';

const fields = 'name,capital,population,flags,languages';
const url = 'https://restcountries.com/v3.1/name/';
function fetchCountries(name) {
  return fetch(`${url}${name}?fields=${fields}`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    });
}

export { fetchCountries };
