"use strict";

const section_body = document.querySelector(".section-body");
const optionToggle = document.querySelector(".select-btn");
const options = document.querySelector(".options");
const arrowKey = document.querySelector(".arrow");
const searchBtn = document.querySelector(".fa-search");
const option = document.querySelectorAll(".option");
const sectionHeader = document.querySelector(".section-header");
const countryContainer = document.querySelector(".country-container");
const toggleThemBtn = document.querySelector(".toggle-them-mode");
const headerContainer = document.querySelector(".header-container");
let themeMode = localStorage.getItem("themeMode");

console.log(themeMode);

let array = [];

// theme

if (themeMode === "darkTheme") {
  darkTheme();
}
if (themeMode === "lightTheme") {
  lightTheme();
}

// fetching countries

const fetchingCountries = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Country is not found, please check the name and retry"
        );
      return response.json();
    })
    .then((data) => {
      console.log(data[0]);

      renderingCountries(data);
    })
    .catch((err) => {
      alert(err.message);
    });
};

fetchingCountries("https://restcountries.com/v3.1/all");

// rendring countries

const renderingCountries = (arr) => {
  array = [...arr];
  arr.length = 12;
  countryContainer.innerHTML = "";
  arr.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="country" ${
      toggleThemBtn.hasAttribute("dark-mode")
        ? "dark-mode=true"
        : "dark-mode=false"
    }>
                <img src="${element.flags.png}" alt="sample">
                <div class="country-details">
                    <h1 class="country-name">${element.name.common}</h1>
                    <p>Population: <span>${new Intl.NumberFormat().format(
                      element.population
                    )}</span></p>
                    <p>Region: <span>${element.region}</span></p>
                    <p>Capital: <span>${element.capital}</span></p>
                </div>
            </div>`;

    countryContainer.appendChild(div);
  });
};

const renderingSingleCountry = (data) => {
  console.log("I am called");

  const div = document.createElement("div");
  div.innerHTML = `<div class="single-country" ${
    toggleThemBtn.hasAttribute("dark-mode")
      ? "dark-mode=true"
      : "dark-mode=false"
  }>
            <div class="single-country-header">
                <button class="skipe-btn"><i class="fas    fa-long-arrow-left"></i> Back</button>
            </div>
            <div class="single-country-container">
            <img class="single-country-image" src="${data.flags.png}" alt="">
            <div class="single-country-details">
                <div class="single-country-details-header">
                <h1 class="country-name">${data.name.common}</h1>
                </div>
                <div class="single-country-details-body">
                <div class="single-country-sub-con">
                    <p>Native Name: <span>${
                      data.name?.nativeName?.eng?.official
                    }</span></p>
                    <p>Population: <span>${new Intl.NumberFormat().format(
                      data.population
                    )}</span></p>
                    <p>Region: <span>${data.region}</span></p>
                    <p>Sub Region: <span>${data.subregion}</span></p>
                    <p>Capital: <span>${data.capital}</span></p>
                </div>
                <div class="single-country-sub-con">
                    <p>Top Level Domain: <span${data.tld}</span></p>
                    <p>Currencies: <span>${data.currencies.XCD?.name}</span></p>
                    <p>Languages: <span>${data.languages.eng}</span></p>
                    
                </div>
                <div class="single-country-sub-con">
                    <h2>Border Countries</h2>
                    <ul class="border-country-list">
                        <li>${
                          data.borders?.slice(0, 1)[0]
                            ? data.borders?.slice(0, 1)[0]
                            : "no border"
                        }</li>
                        <li>${
                          data.borders?.slice(0, 2)[1]
                            ? data.borders?.slice(0, 2)[1]
                            : "no border"
                        }</li>
                        <li>${
                          data.borders?.slice(0, 3)[2]
                            ? data.borders?.slice(0, 3)[2]
                            : "no border"
                        }</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>`;
  countryContainer.innerHTML = "";
  section_body.appendChild(div);

  // section_body.insertAdjacentElement("beforeend", div);
};

// filtering countries by region

optionToggle.addEventListener("click", () => {
  options.hasAttribute("data-visible")
    ? optionToggle.setAttribute("aria-expanded", false)
    : optionToggle.setAttribute("aria-expanded", true);
  options.toggleAttribute("data-visible");
  arrowKey.classList.toggle("fa-chevron-up");
});

option.forEach((el) => {
  el.addEventListener("click", () => {
    fetchingCountries(`https://restcountries.com/v3.1/region/${el.innerText}`);
    options.toggleAttribute("data-visible");
    arrowKey.classList.toggle("fa-chevron-up");
    document.querySelector(".single-country").remove();
  });
});

// searching country

searchBtn.addEventListener("click", (e) => {
  const searchInput = document.querySelector(".search").value;
  if (searchInput) {
    fetchingCountries(`https://restcountries.com/v3.1/name/${searchInput}`);
    e.target.value = "";
    document.querySelector(".single-country").remove();
  }
});

// rendering single country

document.addEventListener("click", function (e) {
  const target = e.target.closest(".country"); // Or any other selector.

  const country = target.children[1].children[0].innerText;

  const result = array.filter((item) => item.name.common === country);

  renderingSingleCountry(result[0]);
});

// closing single country

document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("skipe-btn")) {
    document.querySelector(".single-country").remove();
    // fetchingCountries("https://restcountries.com/v3.1/all");
    console.log(array);
    renderingCountries(array);
  }
});

// dark mode function

function darkTheme() {
  toggleThemBtn.setAttribute("dark-mode", "true");
  headerContainer.setAttribute("dark-mode", "true");
  document.querySelector("section").setAttribute("dark-mode", "true");
  sectionHeader.setAttribute("dark-mode", "true");
  document.querySelectorAll(".country").forEach((el) => {
    el.setAttribute("dark-mode", "true");
  });

  document.querySelector(".single-country")?.setAttribute("dark-mode", "true");
  themeMode = localStorage.setItem("themeMode", "darkTheme");
}

function lightTheme() {
  toggleThemBtn.removeAttribute("dark-mode", "false");
  headerContainer.removeAttribute("dark-mode", "false");
  document.querySelector("section").removeAttribute("dark-mode", "false");
  sectionHeader.removeAttribute("dark-mode", "false");
  document.querySelectorAll(".country").forEach((el) => {
    el.removeAttribute("dark-mode", "false");
  });

  document
    .querySelector(".single-country")
    ?.removeAttribute("dark-mode", "true");

  themeMode = localStorage.setItem("themeMode", "lightTheme");
}

toggleThemBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hello");
  console.log(toggleThemBtn.getAttribute("dark-mode") === false);
  if (toggleThemBtn.getAttribute("dark-mode")) {
    lightTheme();
  } else {
    darkTheme();
  }
});
