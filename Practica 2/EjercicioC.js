
const personas =[
    {nombre: "Ana", edad: 25},
    {nombre: "Luis", edad: 30},
    {nombre: "Pedro", edad: 35}
];

//usa .find() para buscar a la persona con nombre "Luis", y usa .forEach() para imprimir el nombre de cada persona con su edad y usa .reduce() para sumar todas las edades y obtener un total
const personaLuis = personas.find(persona => persona.nombre === "Luis");
const totalEdad = personas.reduce((acumulador, persona) => acumulador + persona.edad, 0);
const mensaje = `La persona encontrada es: ${personaLuis.nombre}, y la suma de todas las edades es: ${totalEdad}`;
// Muestra el resultado
console.log(mensaje);
// Muestra el nombre y edad de cada persona
personas.forEach(persona => {
    console.log(`Nombre: ${persona.nombre}, Edad: ${persona.edad}`);
});
// Muestra el resultado de la suma de todas las edades
console.log(`La suma de todas las edades es: ${totalEdad}`);