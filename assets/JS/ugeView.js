const myUri = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,windspeed_10m&models=icon_eu&daily=sunrise,sunset&timezone=Europe%2FBerlin`;

let myData = null;
let myApp = null;

/* kicks off app when the DOM is loaded */
window.addEventListener("load", hentLoadScreen);
function hentLoadScreen() {
   fetch(myUri)
      .then(
         (dataModtaget)=> {
            return dataModtaget.json();
         }
      )
      .then(
         (data) => {
            bygLoadScreen();
            asyncLoad(data);
            console.log({data});
         }
      )
      .catch( //er det kun tastefejl/stavefejl i uri'en?
         (error) => {
            console.error("****  Her er fejlen!  ****", error);
         }
      );
   myApp = document.getElementById('akmApp');
}

//Bygger loadingsreenen
function bygLoadScreen() {
   //BYGGER SECTION TIL LOADING ICON
   let loadingSection = document.createElement('section');
   loadingSection.classList.add('loadingSectionClass');
   myApp.appendChild(loadingSection);
   //BYGGER IMG TIL LOADING ICON                  
   let loadingIcon = document.createElement('img');
   loadingIcon.src = './assets/images/weather_dribbble_size.gif.gif';
   loadingIcon.classList.add('loadingIconClass');
   loadingSection.appendChild(loadingIcon);
}
function startCards(dataModtaget) {
   // console.log(dataModtaget);
   // kaldes fra fetchData når data er klar. 
   // set myData variablen til det modtagne data, så det er tilgængelig for alle funktioner
   myData = dataModtaget;
   // console.log('function startCards ',{myData});
   //kald funktionen sletSide for at slette indhold i app-tagget, som er indeholdt i myApp.
   sletSide();

   // kalder en funktion der kan bygge cards. den hedder bygCards
   bygCards(myData);
}

function sletSide() {
   // kan slette alt html i app-tagget husk det er indeholdt i myApp
   myApp.innerHTML = "";
}
function bygCards(data) {
   console.log("Her er data: ", {data})
   //map-metoden finder data for hvert card, og sender det til en funktion der
   //kan bygge dit galleri kort for dyret. funktionen hedder buildCard, og har brugfor data for dyret
   data.map((cards) => {
      homeLanding(cards);
   });
};

//---------Funktionen homeLanding()-------            
// Forsiden/home
function homeLanding(myData) {

   let homeLanding = document.createElement('section');
   homeLanding.classList.add('homeLandingClass');

   //      mainRamme
   let mainRamme = document.createElement('section');
   mainRamme.classList.add('mainRammeClass');
   homeLanding.appendChild(mainRamme);
   //       minBy
   let minBy = document.createElement('h1');
   minBy.classList.add('minByClass');
   minBy.innerText = myData.by;
   mainRamme.appendChild(minBy);
   //     tempNu
   let tempNu = document.createElement('p');
   tempNu.classList.add('tempNuclass');
   tempNu.innerText = myData.temp;
   mainRamme.appendChild(tempNu);
   //    vindNu
   let vindNu = document.createElement('p');
   vindNu.classList.add('vindNuClass');
   vindNu.innerText = myData.vindHastighed;
   mainRamme.appendChild(vindNu);
   //    nedbørNu
   let regnNu = document.createElement('p');
   regnNu.classList.add('regnNuClass');
   regnNu.innerText = myData.regn;
   mainRamme.appendChild(regnNu);
   //    iconNu
   let iconNu = document.createElement('img');
   iconNu.scr = myData.icon;
   iconNu.classList.add('iconNuClass');
   mainRamme.appendChild(iconNu);
   //    solDiv
   let solDiv = document.createElement('div');
   solDiv.classList.add('solDivClass');

   //  icon til solopgang
   let solopGang = document.createElement('img');
   solopGang.src = myData.solopicon;
   solopGang.classList.add('solopGangClass');
   solDiv.appendChild(solopGang);
   //   solopgang
   let solopgang = document.createElement('p');
   solopgang.classList.add('solopGangClass');
   solopgang.innerText = myData.solopgang;
   solDiv.appendChild(solopgang);
   //icon til solnedgang
   let solnedGangIcon = document.createElement('img');
   solnedGangIcon.src = myData.solnedicon;
   solnedGangIcon.classList.add('solnedgangClass');
   solDiv.appendChild(solnedGangIcon);
   //  solnedgang
   let solnedgang = document.createElement('p');
   solnedgang.innerText = myData.solnedgang;
   solnedgang.classList.add('solnedgangClass');
   solDiv.appendChild(solnedgang);

   //////////////////////////////////////////////////////////////////////////////////////////////
   /*LILLE RAMME (lille card) som indeholder klokkeslæt, img, temp*/


   let scrollSection = document.createElement('section')
   scrollSection.classList.add('scrollSection')
   homeLanding.appendChild(scrollSection)

   // Ganger det hele 48 gange
   for (let i = 0; i < 48; i++) {
      //    lille card
      let lilleCard = document.createElement('div');
      lilleCard.classList.add('lilleRammeClass');
      scrollSection.appendChild(lilleCard);

      //    klokkeslet
      let klokke = document.createElement('p');
      klokke.classList.add('klokkeClass');
      klokke.innerText = myData.time;
      lilleCard.appendChild(klokke);

      //    tempbillede
      let tempBillede = document.createElement('img');
      tempBillede.src = myData.solnedicon;
      tempBillede.classList.add('tempBilled');
      lilleCard.appendChild(tempBillede);

      //   lille temp
      let lilleTemp = document.createElement('p');
      lilleTemp.classList.add('lilleTempClass');
      lilleTemp.innerText = myData.temp;
      lilleCard.appendChild(lilleTemp);
   }

   ///////////////////////////////////////////////////////////////////////////////////////////
   /*BUTTONS - I DAG og UGEN*/
   // div til de to knapper
   let divKnapper = document.createElement('div');
   divKnapper.classList.add('divKnapper');
   homeLanding.appendChild(divKnapper);
   // knap (button) i Dag
   let idag = document.createElement('a');
   idag.classList.add('idagClass');
   idag.innerText = 'I DAG';
   divKnapper.appendChild(idag);
   //  knap (button) ugen
   let ugen = document.createElement('a');
   ugen.classList.add('idagClass');
   ugen.innerText = 'UGEN';
   divKnapper.appendChild(ugen);

   mainRamme.appendChild(solDiv);
   myApp.appendChild(homeLanding);

   ugen.addEventListener("click", (e) => {
      sletSide();
      // ugeView();
      bygUgenCards(myData);
   });
}
function bygUgenCards(data) {
   // console.log("her er det data ", data);
   //map-metoden finder data for hvert card, og sender det til en funktion der
   //kan bygge dit galleri kort for dyret. funktionen hedder buildCard, og har brugfor data for dyret
   ugeView(data);
}
function ugeView(myCardData) {
   console.log("her er det data ", myCardData);
  /*  let { by, dato, icon, //destructuring af data
      regn,
      solnedgang,
      solnedicon,
      solopgang,
      solopicon,
      temp,
      time,
      vindHastighed } = myCardData; */


   /*  
    
   /**
    * Convert a given date to the format yyyy-mm-dd
    * @param {Number} addDays
    * @returns Date String
    */
   const main = document.getElementById("akmApp")

   let knapContainer = document.createElement('div');
   
   // knap (button) i Dag 
   let idagTo = document.createElement('a'); 
   idagTo.style.color = 'red';
   idagTo.innerText = 'I DAG'; 
   
   // knap (button) ugen 
   let ugenTo = document.createElement('a'); 
   ugenTo.style.color = 'red';
   ugenTo.innerText = 'UGEN'; 
   knapContainer.appendChild(ugenTo); 
   knapContainer.appendChild(idagTo); 
   main.appendChild(knapContainer); 


   idagTo.addEventListener("click", (e) => { 
      e.preventDefault();
      sletSide(); 
      bygCards(myCardData);
      console.log({myCardData});
   });

   const setApiDate = (addDays = 0) => {
      let curDate = addDays
         ? new Date(new Date().getTime() + addDays * 86400 * 1000)
         : new Date()
      let strYear = curDate.getFullYear()
      let strMonth = (curDate.getMonth() + 1).toString().padStart(2, 0)
      let strDate = curDate.getDate().toString().padStart(2, 0)
      return `${strYear}-${strMonth}-${strDate}`
   }

   /**
    * Fetch data from a given endpoint
    * @param {String} endpoint
    * @returns JSON Object
    */
   const getData = async (endpoint) => {
      const result = await fetch(endpoint)
      const data = await result.json()
      return data
   }

      /**
       * Eksekverer asynkron function
       */
      ; (async () => {
         const start_date = setApiDate()
         const stop_date = setApiDate(6)

         const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,windspeed_10m,rain,snowfall&daily=sunrise,sunset&current_weather=true&start_date=${start_date}&end_date=${stop_date}&timezone=Europe%2FBerlin`

         const accData = []

         const data = await getData(url)
         console.log(data);


         data.hourly.time.map((value, key) => {
            accData.push({
               date: value.split('T')[0],
               time: value.split('T')[1],
               rain: data.hourly.rain[key],
               temperature: data.hourly.temperature_2m[key],
               windspeed: data.hourly.windspeed_10m[key],
            })
         })

         data.daily.time.map((value, key) => {
            const table = document.createElement('table')
            table.classList.add('weatherscheme')
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            th.setAttribute('colspan', 4)
            th.innerText = value;
            tr.append(th)
            table.append(tr)
            const hours = accData.filter(x => x.date === value)
            hours.map((hour, index) => {
               if (index % 6 === 0) {
                  const tr = document.createElement('tr')
                  const td_time = document.createElement('td')
                  const td_rain = document.createElement('td')
                  const td_temp = document.createElement('td')
                  const td_wind = document.createElement('td')

                  const newtime = `${(+hour.time.split(':')[0] + 6).toString().padStart(2, 0)}:00`
                  td_time.innerText = `${hour.time} - ${newtime}:`
                  td_rain.innerText = `${hour.rain}`
                  td_temp.innerText = `${hour.temperature}`
                  td_wind.innerText = `${hour.windspeed}`

                  tr.appendChild(td_time)
                  tr.appendChild(td_temp)
                  tr.appendChild(td_rain)
                  tr.appendChild(td_wind)
                  table.append(tr)
               }
            })

            console.log(hours);
            main.appendChild(table)
         })

      })()

};


//Starter funktionen fetchData (Dummy Data)
async function asyncLoad(data) {

   await new Promise(resolve => setTimeout(resolve, 5000));//SKAL ÆDRES TIL 2 SEKUNDER

   dataCard = [

      {
         dato: data.daily.time[0],
         time: '11.56',
         by: 'Aalborg',
         temp: data.hourly.temperature_2m[0]+'\u00B0',
         vindHastighed: data.hourly.windspeed_10m[0]+'m/s',
         regn: data.hourly.precipitation[0]+'mm',
         icon: 'assets/SVG/Fuld-sol.svg',
         solopicon: '../SVG/solOpGang.png',
         solopgang: data.daily.sunrise[0],
         solnedicon: '../SVG/solNedGang.png',
         solnedgang: data.daily.sunset[0]
      },
      {
         dato: data.daily.time[0],
         time: '11.56',
         by: 'Nørresundby',
         temp: data.hourly.temperature_2m[0]+'\u00B0',
         vindHastighed: data.hourly.windspeed_10m[0]+'m/s',
         regn: data.hourly.precipitation[0]+'mm',
         icon: '../SVG/Fuld-sol.svg',
         solopicon: '../SVG/solOpGang.png',
         solopgang: data.daily.sunrise[0],
         solnedicon: '../SVG/solNedGang.png',
         solnedgang: data.daily.sunset[0]
      },
   ];
   console.log(dataCard);
   startCards(dataCard);
}



