//Tienes el siguiente objeto persona, Exrtrae los valores de nombre, edad y cuidad usando destructuracion y luego muestra un mensaje como "Me llamo Domingo Araujo, tengo 37 años y vivo en Queretaro"
const persona = {
    nombre: "Domingo Araujo",
    edad: 20,
    dirección:{
        ciudad: "Queretaro",
        pais: "Mexico"
    }
};
// Aplica la destructuración aqui swgun el codigo anterior
const { nombre, edad, dirección: { ciudad } } = persona;
// Muestra el mensaje
console.log(`Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}`); // Me llamo Domingo Araujo, tengo 37 años y vivo en Queretaro