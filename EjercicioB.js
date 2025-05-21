//Con el siguiente arreglo de productos, realiza lo siguiente: Filtra los productos cuyo precio sea mayor a 1000
//  y usa .map() para convertir el resultado en un nuevo arreglo con solo los nombres de esos productos.
const productos = [
    {nombre: "Laptop", precio: 1200},
    {nombre: "Mouse", precio: 250},
    {nombre: "Teclado", precio: 750},
    {nombre: "Monitor", precio: 3000},
]

// Tu código aqui
const productosFiltrados = productos.filter(producto => producto.precio > 1000);
const nombres = productosFiltrados.map(producto => producto.nombre);   
// Muestra el resultado segun el producto filtrado
console.log(productosFiltrados); 
// Muestra solo los nombres
console.log(productosFiltrados.map(producto => producto.nombre)); 

