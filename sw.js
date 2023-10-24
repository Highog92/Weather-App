const staticCacheName = 'site-static-v1.2'

const assets = [
    '/',
    "/index.html",
    "assets/css/burger-menu.css",
    "assets/css/button.css",
    "assets/css/loading.css",
    "assets/css/main.css",
    "assets/css/Ugen.css"
]


// Service worker
// 1. Registrering
// En serviceworker skal registreres i browseren og dette foregår fra en anden javascript fil. 
// De fleste browsere er kompatible med serviceworker men det er en god ide at tjekke.

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.error('service worker not registred'))
}

// 2. Installation
// Derefter skal serviceworkeren installeres i browseren. Her har vi mulighed for at lytte på install eventet og 
// køre forskellige handlinger i forbindelse med installationen. F.eks. kan vi lagre nødvendige filer i browserens cache til offline brug.

self.addEventListener('install', event => {

    event.waitUntil(

        caches.open(staticCacheName).then(cache => {
            console.log('Write asset files to cache');
            cache.addAll(assets)
        })
    )
    console.log('Service Worker has been installed');
})

// 3. Aktivering

// Når serviceworkeren er installeret skal den aktiveres. Her har vi også mulighed for at lytte på activate eventet og køre forskellige handlinger samtidigt.

self.addEventListener('activate', event => {
    console.log('Service Worker has been activated');

    // Sletter tidligere versioner af cachen
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== staticCacheName).map(key => caches.delete(key))
            )

            // const filteredkeys = keys.filter(key => key !== staticCacheName)
            // filteredkeys.map(key => {
            //     caches.delete(key)
            // })
        })

    )
})

// 4. Fetch
// Når serviceworkeren er aktiveret har vi mulighed for at lytte på alle de forskellige fetch requests der bliver sendt fra sitet. 
// Der med kan vi bruge serviceworkeren som en slags proxy server, hvor vi kan påvirke de svar der kommer fra serveren, inden de rammer browseren.

self.addEventListener('fetch', event => {

    // Konrtoller svar på request
    event.respondWith(
        // Kig efter file match i cache
        caches.match(event.request).then(cachesRes => {
            // Returner match fra cache - ellers hent fil på server
            return (cachesResult || fetch(event.request).then(fetchResult => {
                // Tilføjer nye sider til cachen
                return caches.open(dynamicCacheName).then(cache => {
                    // Bruger put til at tilføje sider til vores cache
                    // Læg mærke til metoden clone
                    cache.put(event.request.url, fetchRes.clone())
                    // Retunerer fetch request
                    return fetchRes
                })
            })
            )
        })
    )
    console.log('Fetct event', event);
    // Funktionen til styring af antal filer i en given cache
    const limitCacheSize = (cacheName, numberOfAllowedFiles) => {

        // Åbn den angivende cache
        caches.open(cacheName.then(cache => {
            // Hent array af cache keys
            cache.keys().then(keys => {
                // Hvis mængden af filer overstiger det tilladte
                if (keys.length > numberOfAllowedFiles) {
                    // Slet første index (ældste fil) og kør funktion igen indtil antal er nået 
                    cache.delete(keys[0]).then(limitCacheSize(cacheName, numberOfAllowedFiles))

                }
            })
        }))
    }

    
})

// Kalder limit cache funktionen
limitCacheSize(dynamicCacheName, 2)
console.log('Det virker', dynamicCacheName);


// Registrering af ny eller opdateret serviceworker
// Det kan blive lidt tricky hvis vi ændrer i en eksisterende eller opretter en ny serviceworker.

// En serviceworker bliver kun registreret og installeret een gang, hvis der ikke ændres i sw.js filen.

// Hvis der er ændringer i sw.js filen, registreres og installeres den nye serviceworker i baggrunden, men den eksisterende (gamle) serviceworker udfører sit normale arbejde. Det betyder at den nye serviceworker bliver sat i en venteposition og først aktiveres når browservinduet opdateres eller lukkes.

// Dette er for at sikre at vores App kører hvis der skulle gå noget galt under installationen af den nye serviceworker.

// Man kan dog sætte en indstilling i browserens udviklingsværktøj, der tvinger installation af nye serviceworkers igennem:

// Åbn browserens udviklingsværktøj
// Gå til fanen Application/Applikationer
// Klik på Serviceworker i menuen til venstre
// Sæt kryds i feltet med Update on reload

