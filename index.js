

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
const btnTheme = document.getElementById("checkbox")
const theme = document.getElementById("theme-btn")
const logo = document.getElementById("logo-img")
const muñeco = document.getElementById("muñeco-img")
const contenedorSection2 = document.getElementById("section2")
window.onload = verificaSiEstaEnCelular
btnTheme.onclick = () => {
    if (!btnTheme.checked) {
        theme.src = `${location.origin}/img/themeLight.png`
        logo.src = `${location.origin}/img/logo-alura.png`
        muñeco.src = `${location.origin}/img/Muñeco.png`
        document.documentElement.style.setProperty("--background", "#F3F5FC")
        document.documentElement.style.setProperty("--color-bg-botones", "#0A3871")
        document.documentElement.style.setProperty("--color-border", "#0A3871")
        document.documentElement.style.setProperty("--color-contrast-claro", "#D8DFE8")
        document.documentElement.style.setProperty("--color-contrast-oscuro", "#fff")


        return

    }
    theme.src = `${location.origin}/img/themeDark.png`
    logo.src = `${location.origin}/img/image.png`
    muñeco.src = `${location.origin}/img/muñeco-b&n.png`
    document.documentElement.style.setProperty("--background", "#292929")
    document.documentElement.style.setProperty("--color-bg-botones", "#45494b")
    document.documentElement.style.setProperty("--color-border", "#A0a7ac")
    document.documentElement.style.setProperty("--color-contrast-claro", "#C8CDD0")
    document.documentElement.style.setProperty("--color-contrast-oscuro", "#000")



}
function verificaSiEstaEnCelular() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        btnCopy.dataset.content = ""
        btnDesencriptador.dataset.content = ""
        btnEncriptador.dataset.content = ""
    } else {

        btnCopy.dataset.content = ""
        btnDesencriptador.dataset.content = ""
        btnEncriptador.dataset.content = ""
    }
}

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
function copied() {
    contenedorSection2.style.setProperty("--color", "var(--color-border)");
    contenedorSection2.style.animation = "rotate 1s 3 alternate ease-in-out"
    btnCopy.innerHTML = "Copiado!!!"
    setTimeout(() => {
        contenedorSection2.style.animation = ""
        contenedorSection2.style.setProperty("--color", "transparent");
        btnCopy.innerHTML = "Copiar"
    }, 1800);
}
function pegar() {
    return new Promise((resolve) => {
        resolve(navigator.clipboard.readText())
    })
}
async function coping() {
    new Promise((resolve) => {
        resolve(navigator.clipboard.writeText(output.innerHTML))
        console.log("copiado");
    });

}
btnCopy.onclick = async () => {
    await coping()
    copied()
}

btnDesencriptador.onclick = desencript
btnEncriptador.onclick = encript
function desencript() {
    // gaitober
    let value = input.value
    let valueDescript = desencriptar(value)
    verificarSiEstaVacio(value)
    let duration = 50
    if (valueDescript.length < 50) {
        // duration = 0
        writeAnimation(valueDescript, duration)
    } else {
        output.innerHTML = valueDescript
    }
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


// verificar que esta pulsado el boton Control con el keydown para el siguiente keydown
// si esta esta pulsado el keydown no se altera (se deja como Control) y el keyup seria el siguiente keyup
//  y cuando ya este soltado el keyup (osea se ejecuta el atajo) el keyDown se reinicia y el keyUp tambien
//  si esque no esta pulsado el btoton Control el keyDown seria el key pulsado y el keyup tambien sera el mismo


window.onkeydown = (e) => {
    if (!siControlEstaPulsado()) {
        btnDown = e.key
    }
    if (siControlEstaPulsado() == true && e.key == "m") {
        btnEncriptador.classList.remove("btn-encriptador")
        btnEncriptador.classList.add("btn-encriptador-active")

    }
    if (siControlEstaPulsado() == true && e.key == "q") {
        btnDesencriptador.classList.remove("btn-desencriptador")
        btnDesencriptador.classList.add("btn-desencriptador-active")
    }
    if (siControlEstaPulsado() == true && e.key == "c") {
        btnCopy.classList.remove("btn-copiar")
        btnCopy.classList.add("btn-copiar-active")

    }
}
window.onkeyup = (e) => {
    if (siControlEstaPulsado()) {
        btnUp = e.key
        if (btnDown == "Control" && btnUp == "m") {
            // encript()

            const event = new Event("click");
            btnEncriptador.dispatchEvent(event)
            // btnEncriptador.style = style2
            btnEncriptador.classList.remove("btn-encriptador-active")
            btnEncriptador.classList.add("btn-encriptador")
            btnUp = ""
        } else if (btnDown == "Control" && btnUp == "q") {
            const event = new Event("click");
            btnDesencriptador.dispatchEvent(event)
            btnDesencriptador.classList.remove("btn-desencriptador-active")
            btnDesencriptador.classList.add("btn-desencriptador")
            btnUp = ""
        }
        else if (btnDown == "Control" && btnUp == "c") {
            const event = new Event("click");
            btnCopy.dispatchEvent(event)
            btnCopy.classList.remove("btn-copiar-active")
            btnCopy.classList.add("btn-copiar")
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