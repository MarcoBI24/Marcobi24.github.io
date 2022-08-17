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
btnCopy.onclick = async ()=>{
    const cp =  await new Promise((resolve,reject) =>{
        resolve(navigator.clipboard.writeText(output.innerHTML))
        // agregar un pop up que diga copiado
        console.log("copiado");
    });
    const reso = await pegar()
    // console.log(reso)
  






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
    output.innerHTML = desencriptar(value)
}
btnEncriptador.onclick = () => {
    let value = input.value
    output.innerHTML = encriptar(value)
    input.value = ""
}
