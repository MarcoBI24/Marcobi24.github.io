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
    contenedorSection2.style.animation = "copied .6s 3 alternate ease-in-out"
    btnCopy.innerHTML = "Copiado!!!"

    setTimeout(() => {
        contenedorSection2.style.animation = ""
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

btnDesencriptador.onclick = () => {
    // gaitober
    let value = input.value
    let valueDescript = desencriptar(value)
    let duration = 50
    if (valueDescript.length < 50) {
        // duration = 0
        writeAnimation(valueDescript, duration)
    }else{
        output.innerHTML = valueDescript
    }
    verificarSiEstaVacio(value)
    writeAnimation(valueDescript,duration)
    input.value = ""

}
btnEncriptador.onclick = () => {
    let value = input.value
    verificarSiEstaVacio(value)
    let valueEncrip = encriptar(value)
    let duration = 50
    if (valueEncrip.length < 50) {
        // duration = 0
        writeAnimation(valueEncrip,duration)
    }else{
        output.innerHTML = valueEncrip
    }
    input.value = ""

}

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
    function startInterval(value,duration) {
        idInterval = setInterval(writeText, duration, value);
    }
}

// let ctn2 = document.getElementById("texto")
// console.log(ctn2);