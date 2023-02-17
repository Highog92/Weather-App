//-----------starte når DOM er Loaded--------------'

let myData = null;

let myApp = null;



windows.addEventListene ('load' , hentLoadScreen);


 //------Starte Function hentLoadScreen------

 function hentLoadScreen (){
    fetchData();
    bygLoadSreen();
    myApp = document.getElementById('app'); 

 }


 //--------Bygger LoadingSreenen------


 function bygLoadSreen(){
    //***BYGGER SECTION TIL LOADING ICON***
    let loadingSection = document.createElement('section');

    loadingSection.classList.add('loadingSectionClass');

    myApp.appendChild(loadingSreenWrapper);

    //***BYGGER IMG TIL LOADING ICON***
      let loadingIcon = document.createElement('img');
    
     loadingIcon.src = './assets/img/';

     loadingIcon.classList.add('loadingIconClass');

     loadingSection.appendChild(loadingIcon);
 }
                       
     
 //-------Starter funktionen fetchData (Dummy Data)----------
 function fetchData(){

 await new Promise(resove = > setTimeout(resolve,2000));

 const myData = [
    {
        dato: '17.02.2023',
        klokkeslet: '11.56',
        by:'Aalborg',
        temp:'8',
        vindHastighed: '20m/s',
        nedbør:'0mm',
        icon: './assets/imges/',
        solopIcon: './assetst/images/',
        solopgang:'07:46',
        solnedIcon:'./assets/images/',
        solnedgang:'17:22',
    },
     {
        dato:'17.02.2023',
        klokkeslet:'11:56',
        by:'Nørresundby',
        temp:'7',
        vindHastighed:'25m/s',
        nedbør:'0mm',
        icon:'./aasets/images',
        solopIcon:'./assets/imegas',
        solnedIcon:'./assets/imegas',
        solnedgang:'17:23',
         
     }
 ]
}
   

//---------Funktionen homeLanding()-------             
