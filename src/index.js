import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const searchQuery = refs.input.value.trim();

  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  if (searchQuery === '') {
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length > 2 && countries.length <= 10) {
        markUpList(countries);
      } else if (countries.length === 1) {
        markUpInfo(countries);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function markUpList(countries) {
  countries.forEach(country => {
    const { flags, name } = country;
    const liItem = document.createElement('li');
    const countryFlag = document.createElement('img');
    const countryName = document.createElement('p');

    countryFlag.src = flags.svg;
    countryFlag.alt = `Flag of ${name}`;
    countryFlag.width = 20;
    countryFlag.height = 20;

    countryName.textContent = name.official;

    liItem.append(countryFlag, countryName);
    refs.countryList.appendChild(liItem);
  });
  console.log('выводим страны списком');
}

function markUpInfo(countries) {
  const { flags, name, capital, population, languages } = countries[0];
  const allLanguages = Object.values(countries[0].languages).join(', ');
  const markUp = `
    <h1>
    <img src="${flags.svg}" alt="Flag of ${name.official}" width= 30px> ${name.official}
    </h1>
      <ul>
        <li><span>Capital:</span> ${capital}</li>
        <li><span>Population:</span> ${population}</li>
        <li><span>Languages:</span> ${allLanguages}</li>
      </ul>`;
  refs.countryInfo.innerHTML = markUp;
  console.log('выводим карточку страны');
}
