const main = document.getElementById("app")
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
       const stop_date = setApiDate(1)

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
          const table = document.createElement('div')
          table.classList.add('weatherscheme')
          const tr = document.createElement('ul')
          const th = document.createElement('h2')
          th.setAttribute('colspan', 4)
          th.innerText = ["Aalborg"];
          tr.append(th)
          table.append(tr)
          const hours = accData.filter(x => x.date === value)
          hours.map((hour, index) => {
             if (index % 1 === 0) {
                const tr = document.createElement('ul')
                const td_time = document.createElement('li')
                const td_rain = document.createElement('li')
                const td_temp = document.createElement('li')
                const td_wind = document.createElement('li')

                const newtime = `${(+hour.time.split(':')[0] + 6).toString().padStart(2, 0)}:00`
                td_time.innerText = `${hour.time} - ${newtime}:`
                td_rain.innerText = `${hour.rain} \u00B0`
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

