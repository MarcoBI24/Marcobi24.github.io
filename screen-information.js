// para que cuando se haga click en el btn, el btn gire 180 deg
const btns = document.querySelectorAll(".icon-arrow-down")
btns.forEach(btn => {
    btn.onclick = (e)=>{
        
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

// country
// region
// city
// latitud-longitude
// accuracy

const country = document.getElementById("country")
const region = document.getElementById("region")
const city = document.getElementById("city")
const latitudeLongitude = document.getElementById("latitude-longitude")
const accuracy = document.getElementById("accuracy")

console.log(CDATASection);












