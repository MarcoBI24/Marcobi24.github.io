import { getAspectRatio } from "./aspect-ratio.js";
const $ = id => document.getElementById(id)



let percentageText = $("percentage")
let loadingText = $("text-loading")
let loadRay = $("load-ray")
let timeLoad = $("timeLoadFinish")
let timeDownload = $("timeDownloadFinish")

let batteryStatus
let batteryContenedor = $("battery-conteiner")
function crearCargaBlock(color) {
  let div = document.createElement("div")
  div.classList.add("carga")
  div.style.backgroundColor = color
  batteryContenedor.appendChild(div)
}






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


const fecha = $("td-fecha")
const hora = $("td-hora")
const sO = $("td-so")
const screenInfo = $("td-screen")
const browser = $("td-browser")
console.log(navigator.userAgent);
sO.innerHTML = navigator.platform
browser.innerHTML = getBrowserInfo()
screenInfo.innerHTML = `${document.body.clientWidth} x ${document.body.clientHeight}`

const ipAddress = $("td-ip")

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
    } else if (square1.style.background == "rgb(255, 65, 129)") {
      square1.style.background = "rgb(255, 164, 0)"
    } else {
      square1.style.background = "rgb(12, 206, 107)"
    }

    if (square2.style.background == "rgb(255, 164, 0)") {
      square2.style.background = "rgb(12, 206, 107)"
    } else if (square2.style.background == "rgb(12, 206, 107)") {
      square2.style.background = "rgb(255, 65, 129)"
    } else {
      square2.style.background = "rgb(255, 164, 0)"
    }
    if (square3.style.background == "rgb(255, 65, 129)") {
      square3.style.background = "rgb(255, 164, 0)"
    } else if (square3.style.background == "rgb(255, 164, 0)") {
      square3.style.background = "rgb(12, 206, 107)"
    } else {
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
  }).catch((error) => {
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

  function setTime(data, element, property, iconElement) {
    if ($$(data, property).score * 100 >= 90) {
      element.style.color = "#0cce6b"
      iconElement.style.background = "#0cce6b"
    } else if ($$(data, property).score * 100 >= 50) {
      element.style.color = "#ffa400"
      iconElement.style.background = "#ffa400"
    }
    else {
      element.style.color = "#ff4181"
      iconElement.style.background = "#ff4181"
    }
    return $$(data, property).displayValue;

  }

  firstContentFulPaint.innerHTML = setTime(data, firstContentFulPaint, "first-contentful-paint", iconFirstContentFulPaint)

  speedIndex.innerHTML = setTime(data, speedIndex, "speed-index", iconSpeedIndex)

  largestContentFulPaint.innerHTML = setTime(data, largestContentFulPaint, "largest-contentful-paint", iconLargestContentFulPaint)

  timeToInteractive.innerHTML = setTime(data, timeToInteractive, "interactive", iconTimeToInteractive)

  totalBlockingTime.innerHTML = setTime(data, totalBlockingTime, "total-blocking-time", iconTotalBlockingTime)


  cumulativeLayoutShift.innerHTML = setTime(data, cumulativeLayoutShift, "cumulative-layout-shift", iconCumulativeLayoutShift)
  finishLoadingAnimation()
}
setResolveToPerformance()
function $$(obj, index) {
  return obj.lighthouseResult.audits[index]
}
btnTest.onclick = () => {
  console.log(selectBtn.value);
  btnTest.style.color = "#999"
  elementAnimationLoading.style.display = "flex"
  startLoadingAnimation()
  setResolveToPerformance(urlAPIInput.value, selectBtn.value)

  urlAPIInput.value = ""
}















getResponse().then((data) => {
  data = JSON.parse(data)
  locationInfo = data
  console.log(locationInfo);
  ipAddress.innerHTML = locationInfo.ip
}).catch((error) => {
  console.error(`Ocurrio este error ${error}`);
})
function addInfoScreen() {

  devicePixelRatio.innerHTML = window.devicePixelRatio
  colorDepth.innerHTML = window.screen.colorDepth
  window.onresize = () => {
    orientation.innerHTML = window.screen.orientation.type
    resolution.innerHTML = `${window.screen.width} x ${window.screen.height}`
    screenInfo.innerHTML = `${window.screen.width} x ${window.screen.height}`
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

























// td-fecha
// td-hora
// td-so
// td-browser
// td-screen
// td-ip








getDate()
setInterval(() => {
  const hoy = new Date();
  let hour = hoy.getHours();
  let min = hoy.getMinutes();
  let meridiano = "am"
  if (hour > 12) {
    meridiano = "pm"
  }
  if (hour == 0) {
    let dateNow = hoy.toLocaleDateString()
    fecha.innerHTML = dateNow
  }
  hora.innerHTML = `${hour} : ${min} ${meridiano}`
}, 1000);
function getDate() {
  const hoy = new Date();
  let dateNow = hoy.toLocaleDateString()
  fecha.innerHTML = dateNow
  let hour = hoy.getHours();
  let min = hoy.getMinutes();
  let meridiano = "am"
  if (hour > 12) {
    meridiano = "pm"
  }
  hora.innerHTML = `${hour} : ${min} ${meridiano}`

}


navigator.getBattery().then((r) => {
  batteryStatus = r
  let porcentageBattery = Math.floor(batteryStatus.level * 100)
  let cantidadDeCarga = Math.floor(porcentageBattery / 20)
  let colorCarga = calcularCantidadDeCarga(cantidadDeCarga)
  if (cantidadDeCarga == 0) {
    cantidadDeCarga = 1
  }
  for (let i = 0; i < cantidadDeCarga; i++) {
    crearCargaBlock(colorCarga)
  }

  timeLoad.innerHTML = calcularTiempoDeCarga(batteryStatus.chargingTime)
  timeDownload.innerHTML = calcularTiempoDeDescarga(batteryStatus.dischargingTime)
  batteryStatus.onchargingtimechange = () => {
    timeLoad.innerHTML = calcularTiempoDeCarga(batteryStatus.chargingTime)

  }
  batteryStatus.ondischargingtimechange = () => {
    timeDownload.innerHTML = calcularTiempoDeDescarga(batteryStatus.dischargingTime)
  }



  percentageText.innerHTML = `${porcentageBattery} %`
  if (batteryStatus.charging) {
    loadingText.style.display = "block"
  }
  batteryStatus.onchargingchange = () => {
    if (batteryStatus.charging) {
      loadingText.style.display = "block"
    } else {
      loadingText.style.display = "none"
    }
    timeLoad.innerHTML = calcularTiempoDeCarga(batteryStatus.chargingTime)
    timeDownload.innerHTML = calcularTiempoDeDescarga(batteryStatus.dischargingTime)
  }



  console.log(batteryStatus);
  batteryStatus.onlevelchange = () => {
    percentageText.innerHTML = `${porcentageBattery} %`
  }
  function calcularTiempoDeCarga(tiempo) {
    if (tiempo == "Infinity") {
      return "No esta cargando"
    }
    let time = tiempo / 60
    let tiempoEnMin = Math.floor(time)
    let tiempoEnSeg = Math.floor((time - tiempoEnMin) * 60)
    return `${tiempoEnMin} : ${tiempoEnSeg}`

  }
  function calcularTiempoDeDescarga(tiempo) {
    if (tiempo == "Infinity") {
      return "Esta cargando"
    }
    let time = tiempo / 60
    let tiempoEnMin = Math.floor(time)
    let tiempoEnSeg = Math.floor((time - tiempoEnMin) * 60)
    return `${tiempoEnMin} : ${tiempoEnSeg}`

  }
  function calcularCantidadDeCarga(cantidadDeCarga) {
    let colorCarga
    if (cantidadDeCarga == 1 || cantidadDeCarga == 0) {
      colorCarga = "var(--color-red)"
      loadRay.src = "./img/rayDownload.png"
      cantidadDeCarga = 1
    } else if (cantidadDeCarga > 1 && cantidadDeCarga < 4) {
      colorCarga = "var(--color-orange)"
      loadRay.src = "./img/rayNoLoad.png"
    } else {
      colorCarga = "var(--color-green)"
      loadRay.src = "./img/rayLoading.png"
    }
    return colorCarga
  }

})



function getBrowserInfo() {
  var ua= navigator.userAgent, tem, 
  M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
 if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
     return 'IE '+(tem[1] || '');
 }
 if(M[1]=== 'Chrome'){
     tem= ua.match(/\b(OPR|Edg)\/(\d+)/);
     if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
 }
 M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
 if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
 return M.join(' ');
};






