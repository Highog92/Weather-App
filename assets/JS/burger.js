let myApp = document.getElementById("akmApp");

const navSlider = function () {

    // Henter elementer der skal bruges
    const burger = document.querySelector('.burger-lines');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Sætter click event på burger menu
    burger.onclick = function() {
        nav.classList.toggle('nav-active');

        // Looper listen af nav links
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                // Nulstil animation hvis linket har en 
                link.style.animation = '';
            } else {
                // Ellers sæt animation på linket så links fader langsomt ind
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });
        // Toggle class - toggle på burger ikonet (de tre streger) så den animerer mellem tre streger og et kryds
        burger.classList.toggle('toggle');
    }

}
// Kalder funktionen navSlider()
navSlider();

// let burgerMenuNav = document.createElement("nav");
// burgerMenuNav.classList.add("burgerMenuClass");
// myApp.appendChild(burgerMenuNav);

// let searchInput = document.createElement("input");
// myApp.appendChild(searchInput);

// let burgerIcon = document.createElement('div')
// burgerIcon.classList.add('burger-lines')

// let burgerLineOne = document.createElement('div')
// burgerLineOne.classList.add('line1')
// burgerIcon.appendChild(burgerLineOne)

// let burgerLineTwo = document.createElement('div')
// burgerIcon.classList.add('line2')
// burgerIcon.appendChild(burgerLineTwo)

// let burgerLineThree = document.createElement('div')
// burgerIcon.classList.add('line3')
// burgerIcon.appendChild(burgerLineThree)

// let locationHeading = document.createElement('h3')
// locationHeading.classList.add('location-Heading')
// locationHeading.innerText='Lokationer';
// burgerMenuNav.appendChild(locationHeading)
 
// let threeDaysUl = document.createElement('ul')
// burgerMenuNav.appendChild(threeDaysUl)

// let cityWeatherLi = document.createElement('li')
// cityWeatherLi.classList.add('city-weather')
// threeDaysUl.appendChild(cityWeatherLi)

// let cityName = document.createElement('p')
// cityName.innerText='Bynavn'
// cityWeatherLi.appendChild(cityName)

// let favStar = document.createElement('img')
// cityWeatherLi.appendChild(favStar)

// let threeDaysLi = document.createElement('li')
// threeDaysLi.classList.add('threedays')
// threeDaysUl.appendChild(threeDaysLi)

// let dayOneImg = document.createElement('img')
// threeDaysLi.appendChild(dayOneImg)
// img.src = assets/SVG/Fuld-sol.svg;


// let dayOneTemp = document.createElement('p')
// // let temperature = `<p>${'temperatur vises her'}</p>`;
// dayOneTemp.innerText='-3°';
// threeDaysLi.appendChild(dayOneTemp)

// let dayTwoImg = document.createElement('img')
// threeDaysLi.appendChild(dayTwoImg)

// let dayTwoTemp = document.createElement('p')
// dayTwoTemp.innerText='-3°';
// threeDaysLi.appendChild(dayTwoTemp)

// let dayThreeImg = document.createElement('img')
// threeDaysLi.appendChild(dayThreeImg)

// let dayThreeTemp = document.createElement('p')
// dayThreeTemp.innerText='-3°';
// threeDaysLi.appendChild(dayThreeTemp)

// let appCreators = document.createElement('p')
// appCreators.innerText='AKM Meteologisk Institut';
// burgerMenuNav.appendChild(appCreators)


console.log(myApp.innerHTML)
