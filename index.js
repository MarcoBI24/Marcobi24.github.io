//  hacer un boton para que la pantalla cambie de color a n&b 
// hacer para que se pueda encriptar y desencriptar con atajos de teclado
//  hacer una animacion 
// cambio de color de los botones cuando se haga click


// Las "llaves" de encriptación que utilizaremos son las siguientes:

// `La letra "e" es convertida para "enter"`
// `La letra "i" es convertida para "imes"`
// `La letra "a" es convertida para "ai"`
// `La letra "o" es convertida para "ober"`
// `La letra "u" es convertida para "ufat"`
// message secret
// fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!
// capturar los elementos
let input = document.getElementById("input")
const btnEncriptador = document.getElementById("encriptador")
const btnDesencriptador = document.getElementById("desencriptador")
const btnCopy = document.getElementById("copy")
const regEx = /[aeiouáéíóú]/
const output = document.getElementById("output")
const contenedorMsgVacio = document.getElementById("section-2-conteiner-msg-vacio")
const contenedorSection2 = document.getElementById("section2")
const keys = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
    é: "enter",
    í: "imes",
    á: "ai",
    ó: "ober",
    ú: "ufat"
}
function desencriptar(string) {
    let valueDesencripted = string
    for (const key in keys) {
        while (valueDesencripted.includes(keys[key])) {
            valueDesencripted = valueDesencripted.replace(keys[key], key)
        }
    }
    return valueDesencripted
}
function encriptar(string) {
    let valueEncripted = ""
    string = string.toLowerCase()
    for (let i = 0; i < string.length; i++) {
        if (regEx.test(string[i])) {
            valueEncripted += keys[string[i]]
        } else {
            valueEncripted += string[i]
        }
    }
    return valueEncripted
}

function pegar() {
    return new Promise((resolve, reject) => {
        resolve(navigator.clipboard.readText())
    })
}
btnCopy.onclick = async () => {

    const cp = await new Promise((resolve, reject) => {
        resolve(navigator.clipboard.writeText(output.innerHTML))
        // agregar un pop up que diga copiado
        console.log("copiado");
    });
    const reso = await pegar()
    // console.log(reso)
    contenedorSection2.style.setProperty("--color", "darkblue");
    contenedorSection2.style.animation = "rotate 1s 3 alternate ease-in-out"
    btnCopy.innerHTML = "Copiado!!!"
    setTimeout(() => {
        contenedorSection2.style.animation = ""
        contenedorSection2.style.setProperty("--color", "transparent");

        btnCopy.innerHTML = "Copiar"
    }, 1800);






    // const geo = await new Promise((resolve, reject) => {
    //     resolve(navigator.geolocation.getCurrentPosition((position)=>{
    //         let cordernada = position.coords
    //         console.log(`Latitud : ${cordernada.latitude}`);
    //         console.log(`Longitud : ${cordernada.longitude}`);
    //         console.log(`Altitud: ${cordernada.altitude}`);
    //         console.log(`Mas o menos : ${cordernada.accuracy} meters`);

    //     },(error)=>{
    //         console.error(`error ${error.code} --- ${error.message}`);
    //     }))
    // })
    // console.log(geo);
}

btnDesencriptador.onclick = desencript
function desencript() {
    // gaitober
    let value = input.value
    let valueDescript = desencriptar(value)
    let duration = 50
    if (valueDescript.length < 50) {
        // duration = 0
        writeAnimation(valueDescript, duration)
    } else {
        output.innerHTML = valueDescript
    }
    verificarSiEstaVacio(value)
    input.value = ""

}
function encript() {
    let value = input.value
    verificarSiEstaVacio(value)
    let valueEncrip = encriptar(value)
    let duration = 50
    if (valueEncrip.length < 50) {
        // duration = 0
        writeAnimation(valueEncrip, duration)
    } else {
        output.innerHTML = valueEncrip
    }
    input.value = ""
}
btnEncriptador.addEventListener("click", encript)

function verificarSiEstaVacio(value) {
    if (value == "" || value == undefined) {
        contenedorMsgVacio.style.display = "flex"
        output.style.display = "none"
        btnCopy.style.display = "none"
    } else {
        contenedorMsgVacio.style.display = "none"
        btnCopy.style.display = "flex"
        output.style.display = "inline-block"
        output.innerHTML = ""
    }
}
function writeAnimation(value, duration) {
    let i = 0
    let idInterval
    startInterval(value, duration)
    function writeText(value) {
        if (i >= value.length - 1) {
            clearInterval(idInterval)
        }
        output.innerHTML += value[i]
        i++

    }
    function startInterval(value, duration) {
        idInterval = setInterval(writeText, duration, value);
    }
}





let btnDown = ""
let btnUp = ""
const style = `background-color: #D8DFE8;
color: darkblue;
border: 1px solid #0A3871;`
const style2 = `background-color: #0A3871;
color: #fff;
border: 1px solid #fff;`

// verificar que esta pulsado el boton Control con el keydown para el siguiente keydown
// si esta esta pulsado el keydown no se altera (se deja como Control) y el keyup seria el siguiente keyup
//  y cuando ya este soltado el keyup (osea se ejecuta el atajo) el keyDown se reinicia y el keyUp 
//  si esque no esta pulsado el btoton Control el keyDown seria el key pulsado y el keyup tambien sera el mismo
window.onkeydown = (e) => {
    if (!siControlEstaPulsado()) {
        btnDown = e.key
    }
    if (siControlEstaPulsado() == true && e.key == "m") {
        btnEncriptador.style = style
    }
    if (siControlEstaPulsado() == true && e.key == "q") {
        btnDesencriptador.style = style2
    }
}
window.onkeyup = (e) => {
    if (siControlEstaPulsado()) {
        btnUp = e.key
        if (btnDown == "Control" && btnUp == "m") {
            // encript()

            const event = new Event("click");
            btnEncriptador.dispatchEvent(event)
            btnEncriptador.style = style2
            btnUp = ""
        } else if (btnDown == "Control" && btnUp == "q") {
            const event = new Event("click");
            btnDesencriptador.dispatchEvent(event)
            btnDesencriptador.style = style
            btnUp = ""
        }
        else {
            console.log(`Pulsaste ${e.key}`);
        }
    }
    if (siControlEstaPulsado() == false) {
        btnDown = ""
        btnUp = ""
    }
}

function siControlEstaPulsado() {
    let pulsado = false
    if (btnDown == "Control" && btnUp == "") {
        pulsado = true
    }
    return pulsado
}