function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      console.log(countries);
      return countries;
    })
    .catch(error => console.log(error));
}

export { fetchCountries };
