import Notiflix from 'notiflix';

function fetchCountries(name) {
  const fields = 'name,capital,population,flags,languages';
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${fields}`)
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
