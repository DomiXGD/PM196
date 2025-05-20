//Tienes el siguiente objeto persona, Exrtrae los valores de nombre, edad y cuidad usando destructuracion y luego muestra un mensaje como "Me llamo Domingo Araujo, tengo 37 años y vivo en Queretaro"
const persona = {
    nombre: "Domingo Araujo",
    edad: 37,
    ciudad: "Queretaro"
};
// Extrae los valores de nombre, edad y ciudad usando destructuración
const { nombre, edad, ciudad } = persona;
// Muestra un mensaje con los valores extraídos
console.log(`Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}.`);