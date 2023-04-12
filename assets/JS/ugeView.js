let myData = null;

let myApp = null;

/* kicks off app when the DOM is loaded */
window.addEventListener("load", hentLoadScreen);

function hentLoadScreen() {
   fetchData();
   myApp = document.getElementById('akmApp');
   bygLoadScreen();
}

//Bygger loadingsreenen
function bygLoadScreen() {
   //BYGGER SECTION TIL LOADING ICON
   let loadingSection = document.createElement('section');
   loadingSection.classList.add('loadingSectionClass');
   myApp.appendChild(loadingSection);
   //BYGGER IMG TIL LOADING ICON                  
   let loadingIcon = document.createElement('img');
   loadingIcon.src = './assets/images/loading.png';
   loadingIcon.classList.add('loadingIconClass');
   loadingSection.appendChild(loadingIcon);
}
function startCards(dataModtaget) {
   // console.log(dataModtaget);
   // kaldes fra fetchData når data er klar. 
   // set myData variablen til det modtagne data, så det er tilgængelig for alle funktioner
   myData = dataModtaget;

   //kald funktionen sletSide for at slette indhold i app-tagget, som er indeholdt i myApp.
   sletSide();

   // kalder en funktion der kan bygge cards. den hedder bygCards
   bygCards(dataModtaget);
}

function sletSide() {
   // kan slette alt html i app-tagget husk det er indeholdt i myApp
   myApp.innerHTML = "";
}
function bygCards(data) {
   console.log("Her er data: ", data)
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
   regnNu.classList.add('nedbørNuClass');
   regnNu.innerText = myData.regn;
   mainRamme.appendChild(regnNu);
   //    iconNu
   let iconNu = document.createElement('span');
   iconNu.innerHTML = myData.icon;
   iconNu.classList.add('iconNuClass');
   mainRamme.appendChild(iconNu);
   //    solDiv
   let solDiv = document.createElement('div');
   solDiv.classList.add('solDivClass');

   //  icon til solopgang
   let solopGang = document.createElement('span');
   solopGang.innerHTML = myData.solopicon;
   solopGang.classList.add('solopGangClass');
   solDiv.appendChild(solopGang);
   //   solopgang
   let solopgang = document.createElement('p');
   solopgang.classList.add('solopGangClass');
   solopgang.innerText = myData.solopgang;
   solDiv.appendChild(solopgang);
   //icon til solnedgang
   let solnedGangIcon = document.createElement('span');
   solnedGangIcon.innerHTML = myData.solnedicon;
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
   for (let i = 0; i < 48; i++){
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
   let tempBillede = document.createElement('p');
   tempBillede.innerHTML = myData.solnedicon;
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
   //kan bygge dit galleri kort for dyret. funktionen hedder buildCard, og har brug for data for dyret
   ugeView(data);
}
function ugeView(myCardData) {
   console.log("her er det data ", myCardData);
   let { by, dato, icon, //destructuring af data
      regn,
      solnedgang,
      solnedicon,
      solopgang,
      solopicon,
      temp,
      time,
      vindHastighed } = myCardData;


   //Funktionen ugeView()
   //Bygger Ugesiden
   let ugeView = document.createElement('section');
   ugeView.classList.add('ugeViewClass');

   console.log("Her er Ugeview Sectionen ", ugeView);

   //Bygger tabellen(card)
   let tabel = document.createElement('section');
   tabel.classList.add('tabelClass');
   ugeView.appendChild(tabel);

   //Bygger Dato
   let datoen = document.createElement('p');
   datoen.innerHTML = dato;
   console.log("her er datoen", dato)
   datoen.style.backgroundColor = "pink";
   datoen.style.width = "200px";
   datoen.style.height = "200px";
   tabel.appendChild(datoen);
   console.log("her er p ", datoen);
   //

   myApp.appendChild(ugeView);

};


//Starter funktionen fetchData (Dummy Data)
async function fetchData() {

   await new Promise(resolve => setTimeout(resolve, 200));//SKAL ÆDRES TIL 2 SEKUNDER

   const myData = [

      {
         dato: '16.02.2023',
         time: '11.56',
         by: 'Aalborg',
         temp: '-5',
         vindHastighed: '20m/s',
         regn: '0mm',
         icon: '⛈️',
         solopicon: '☀️',
         solopgang: '07:46',
         solnedicon: '🌤️',
         solnedgang: '17:22'
      },
      {
         dato: '16.02.2023',
         time: '11.56',
         by: 'Nørresundby',
         temp: '-7',
         vindHastighed: '25m/s',
         regn: '0mm',
         icon: '⛈️',
         solopicon: '☀️',
         solopgang: '07:45',
         solnedicon: '🌤️',
         solnedgang: '17:23'
      },
   ];
   startCards(myData);
}



