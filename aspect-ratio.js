
// tengo la 2 numeros que son el alto y el ancho 
// dividir ambos numero entre 2 si esque se puede sin que uno de los numeros se decimal osea tiene que ser un entero positivo el cociente  y si ya no se puede con 2 intentar con 3 y tambien tiene que dar cada uno un numero entero positivo y si no se puede con 3 intentar con 4 y asi sucesivamente
export function getAspectRatio(ancho,alto) {
    let num1 = ancho
    let num2 = alto
    for (let divisor = 2; divisor < num2; divisor++) {
        if (num1 % num2 == 0)  {
            num1 = num1 / num2
            num2 = num2 / num2   
            break     
        }
        while (num1 % divisor == 0 && num2 % divisor == 0) {
            num1 = num1 / divisor
            num2 = num2 / divisor
        }
    
    }
    return `${num1}:${num2}`

}

