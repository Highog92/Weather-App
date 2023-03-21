let myApp = document.getElementById("akmApp");

let burgerMenuNav = document.createElement("nav");
burgerMenuNav.classList.add("burgerMenuClass");
myApp.appendChild(burgerMenuNav);

let searchInput = document.createElement("input");
myApp.appendChild(searchInput);

let burgerIcon = document.createElement('div')
burgerIcon.classList.add('burger-lines')

let burgerLineOne = document.createElement('div')
burgerLineOne.classList.add('line1')
burgerIcon.appendChild(burgerLineOne)

let burgerLineTwo = document.createElement('div')
burgerIcon.classList.add('line2')
burgerIcon.appendChild(burgerLineTwo)

let burgerLineThree = document.createElement('div')
burgerIcon.classList.add('line3')
burgerIcon.appendChild(burgerLineThree)

let locationHeading = document.createElement('h3')
locationHeading.classList.add('location-Heading')
locationHeading.innerText='Lokationer';
burgerMenuNav.appendChild(locationHeading)
 
let threeDaysUl = document.createElement('ul')
burgerMenuNav.appendChild(threeDaysUl)

let cityWeatherLi = document.createElement('li')
cityWeatherLi.classList.add('city-weather')
threeDaysUl.appendChild(cityWeatherLi)

let cityName = document.createElement('p')
cityName.innerText='Bynavn'
cityWeatherLi.appendChild(cityName)

let favStar = document.createElement('img')
cityWeatherLi.appendChild(favStar)

let threeDaysLi = document.createElement('li')
threeDaysLi.classList.add('threedays')
threeDaysUl.appendChild(threeDaysLi)

let dayOneImg = document.createElement('img')
threeDaysLi.appendChild(dayOneImg)
img.src = assets/SVG/Fuld-sol.svg;


let dayOneTemp = document.createElement('p')
// let temperature = `<p>${'temperatur vises her'}</p>`;
dayOneTemp.innerText='-3°';
threeDaysLi.appendChild(dayOneTemp)

let dayTwoImg = document.createElement('img')
threeDaysLi.appendChild(dayTwoImg)

let dayTwoTemp = document.createElement('p')
dayTwoTemp.innerText='-3°';
threeDaysLi.appendChild(dayTwoTemp)

let dayThreeImg = document.createElement('img')
threeDaysLi.appendChild(dayThreeImg)

let dayThreeTemp = document.createElement('p')
dayThreeTemp.innerText='-3°';
threeDaysLi.appendChild(dayThreeTemp)

let appCreators = document.createElement('p')
appCreators.innerText='AKM Meteologisk Institut';
burgerMenuNav.appendChild(appCreators)


console.log(myApp.innerHTML)
