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

window.onmousemove  = (e)=>{
  ejeX.value = e.x
  ejeY.value = e.y
  ejeXP.value = scrollX + e.x
  ejeYP.value = scrollY + e.y
}
window.onclick = (e)=>{
  ejeXC.value = e.x
  ejeYC.value = e.y
}

addInfoScreen()


fetch("https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://developers.google.com&key=AIzaSyCfkc_U3EL3kkQr6rpfXasonInsNJ_xJCM&strategy=mobile")
.then(resolve => resolve = resolve.text()).then(d => console.log(JSON.parse(d)))


















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