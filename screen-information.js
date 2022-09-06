import { getAspectRatio } from "./aspect-ratio.js";




// para que cuando se haga click en el btn, el btn gire 180 deg
const btns = document.querySelectorAll(".icon-arrow-down")
btns.forEach(btn => {
  btn.onclick = (e) => {

    const buttonClicked = e.target
    const contenedorOpen = buttonClicked.parentElement.nextElementSibling
    contenedorOpen.style.transition = "all 1s"
    if (contenedorOpen.clientHeight == "0") {
      contenedorOpen.style.height = "100%"
      contenedorOpen.style.background = "orange"
    } else {
      contenedorOpen.style.height = "0px"


    }
  }
});
// API para obtener el IP- Pais - Ciudad - Localizacion https://hutils.loxal.net/whois
// Obtener la IP
const urlIp = "https://hutils.loxal.net/whois"

const country = document.getElementById("country")
const region = document.getElementById("region")
const city = document.getElementById("city")
const latitudeLongitude = document.getElementById("latitude-longitude")
const accuracy = document.getElementById("accuracy")
let locationInfo = ""
const orientation = document.getElementById("orientation")
const resolution = document.getElementById("resolution")
const aspectRatio = document.getElementById("aspectRatio")
const devicePixelRatio = document.getElementById("devicePixelRatio")
const colorDepth = document.getElementById("colorDepth")
// constantes para el mouse X y Y
const ejeX = document.getElementById("ejeX")
const ejeY = document.getElementById("ejeY")
const ejeXP = document.getElementById("ejeXP")
const ejeYP = document.getElementById("ejeYP")
const ejeXC = document.getElementById("ejeXC")
const ejeYC = document.getElementById("ejeYC")

const selectBtn = document.getElementById("strategy")
const $ = id => document.getElementById(id)
const btnTest = $("test")
let urlAPIInput = $("urlApi")
const firstContentFulPaint = $("time-FC")
let iconFirstContentFulPaint = $("icon-FC")
const speedIndex = $("time-SI")
let iconSpeedIndex = $("icon-SI")
const largestContentFulPaint = $("time-LC")
let iconLargestContentFulPaint = $("icon-LC")
const timeToInteractive = $("time-TTI")
let iconTimeToInteractive = $("icon-TTI")
const totalBlockingTime = $("time-TBT")
let iconTotalBlockingTime = $("icon-TBT")
const cumulativeLayoutShift = $("time-CLS")
let iconCumulativeLayoutShift = $("icon-CLS")
let elementAnimationLoading = $("loading-element")
let square1 = $("square-1")
let square2 = $("square-2")
let square3 = $("square-3")
//  verde - naranja - rojo
//  rojo - verde - naranja
//  naranja - rojo - verde
//  verde - naranja - rojo

let id
function startLoadingAnimation() {
  id = setInterval(() => {
    console.log(square1.style.background);
    console.log(square2.style.background);
    console.log(square3.style.background);
    if (square1.style.background == "rgb(12, 206, 107)") {
      square1.style.background = "rgb(255, 65, 129)"
    }else if (square1.style.background == "rgb(255, 65, 129)") {
      square1.style.background = "rgb(255, 164, 0)"
    }else{
      square1.style.background = "rgb(12, 206, 107)"
    }
  
    if (square2.style.background == "rgb(255, 164, 0)") {
      square2.style.background = "rgb(12, 206, 107)"
    }else if (square2.style.background == "rgb(12, 206, 107)") {
      square2.style.background = "rgb(255, 65, 129)"
    }else{
      square2.style.background = "rgb(255, 164, 0)"
    }
    if (square3.style.background == "rgb(255, 65, 129)") {
      square3.style.background = "rgb(255, 164, 0)"
    }else if (square3.style.background == "rgb(255, 164, 0)") {
      square3.style.background = "rgb(12, 206, 107)"
    }else{
      square3.style.background = "rgb(255, 65, 129)"
    }
  }, 400);
}
function finishLoadingAnimation() {
  clearInterval(id)
  btnTest.style.color = "#fff"
  elementAnimationLoading.style.display = "none"
}


window.onmousemove = (e) => {
  ejeX.value = e.x
  ejeY.value = e.y
  ejeXP.value = scrollX + e.x
  ejeYP.value = scrollY + e.y
}
window.onclick = (e) => {
  ejeXC.value = e.x
  ejeYC.value = e.y
}
addInfoScreen()




async function getResolve(url) {
  return fetch(url).then(resolve => {
    resolve = resolve.text()
    return resolve
  }).catch((error)=>{
    console.log(error);
    finishLoadingAnimation()
  })

}
async function setResolveToPerformance(url = "https://www.google.com", strategy = "desktop") {
  // hacer paara que verifique el tiempo de cada element y si esta por arriba de 1 segundo poner rojo y cambiar el icono
  // hacer que mientras cargue el fetch haga una animacion de carga en cada elemento
  let urlTest = url
  let URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${urlTest}&key=AIzaSyCfkc_U3EL3kkQr6rpfXasonInsNJ_xJCM&strategy=${strategy}`

  let data = await getResolve(URL)
  data = JSON.parse(data)
  console.log(data);

  function setTime(data,element, property,iconElement) {
      if ($$(data, property).score * 100 >= 90) {
        element.style.color = "#0cce6b"
        iconElement.style.background = "#0cce6b"
      }else if($$(data, property).score * 100 >= 50){
        element.style.color = "#ffa400"
        iconElement.style.background = "#ffa400"
      }
      else{
        element.style.color = "#ff4181"
        iconElement.style.background = "#ff4181"
      }
      return $$(data,property).displayValue;
    
  }

  firstContentFulPaint.innerHTML = setTime(data,firstContentFulPaint,"first-contentful-paint",iconFirstContentFulPaint)

  speedIndex.innerHTML = setTime(data,speedIndex,"speed-index",iconSpeedIndex)

  largestContentFulPaint.innerHTML = setTime(data,largestContentFulPaint,"largest-contentful-paint",iconLargestContentFulPaint)

  timeToInteractive.innerHTML =setTime(data,timeToInteractive,"interactive",iconTimeToInteractive)

  totalBlockingTime.innerHTML =setTime(data,totalBlockingTime,"total-blocking-time",iconTotalBlockingTime)


  cumulativeLayoutShift.innerHTML = setTime(data,cumulativeLayoutShift,"cumulative-layout-shift",iconCumulativeLayoutShift)
  finishLoadingAnimation()
}
setResolveToPerformance()
function $$(obj,index) {
  return obj.lighthouseResult.audits[index]
  }
btnTest.onclick = () => {
  console.log(selectBtn.value);
  btnTest.style.color = "#999"
  elementAnimationLoading.style.display = "flex"
  startLoadingAnimation()
  setResolveToPerformance(urlAPIInput.value,selectBtn.value)
  
  urlAPIInput.value = ""
}



// icon-FC
// time-FC
// icon-SI
// time-SI
// icon-LC
// time-LC
// icon-TTI
// time-TTI
// icon-TBT
// time-TBT
// icon-CLS
// time-CLS














getResponse().then((data) => {
  data = JSON.parse(data)
  locationInfo = data
  addInfoLocation(locationInfo)
}).catch((error) => {
  console.error(`Ocurrio este error ${error}`);
})
function addInfoScreen() {

  devicePixelRatio.innerHTML = window.devicePixelRatio
  colorDepth.innerHTML = window.screen.colorDepth
  window.onresize = () => {
    orientation.innerHTML = window.screen.orientation.type
    resolution.innerHTML = `${window.screen.width} x ${window.screen.height}`
    aspectRatio.innerHTML = getAspectRatio(window.screen.width, window.screen.height)
  }
}
async function getResponse() {

  let response = await fetch(urlIp)
  return response.text()
}
function addInfoLocation(locationInfo) {
  country.innerHTML = locationInfo.country
  region.innerHTML = locationInfo.timeZone
  city.innerHTML = locationInfo.city
  latitudeLongitude.innerHTML = `${locationInfo.latitude} x ${locationInfo.longitude} `
  navigator.geolocation.getCurrentPosition((c) => {
    accuracy.innerHTML = `${c.coords.accuracy} m`
  });
}