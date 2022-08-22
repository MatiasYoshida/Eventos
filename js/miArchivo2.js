import { Producto } from "./producto.js";

let productos = [];
let carrito = [];

productos = obtenerObjetos(productos);

let inputNombre = document.getElementById("productoElegido");
let botonComprar = document.getElementById("comprar");
let btnAgregarCarrito = document.getElementById("btnAgregarCarrito");



botonComprar.addEventListener("click", () => {
  comprar(carrito);
});


inputNombre.onkeydown = (evento) => {
	console.info("keyDown",evento.key)
	if (evento.key < 1 || evento.key > 5)
	{
		evento.preventDefault();
	}
 };

 btnAgregarCarrito.addEventListener("click", () => {
  let productoElegido = document.getElementById("productoElegido").value;
  let prod =  AgregarProductoCarrito(productoElegido, productos, carrito);
  agregarProducto(prod);
});

function obtenerObjetos(lista) {
  var table = document.getElementsByClassName("trPS"); //obtiene todos los nodos
  for (let i = 0; i < table.length; i++) {
    //recorre los nodos
    let elementos = table[i].children; //elementos contiene los hijos de table
    lista = asignarObjetos(elementos, lista);
  }
  return lista;
}

function asignarObjetos(elementos, lista) {
  let id = elementos[0].textContent; //extrae el valor del nodo
  let nombre = elementos[1].textContent;
  let tipo = elementos[2].textContent;
  let marca = elementos[3].textContent;
  let precio = elementos[4].textContent;
  let stock = elementos[5].textContent;
  lista.push(new Producto(id, nombre, tipo, marca, precio, stock));
  return lista;
}

function AgregarProductoCarrito(id, productos, carrito) {
  productos.forEach((element) => {
    if (element.id == id) {
      if (element.stock > 0) {
        carrito.push(element);
        restarStock(element);
      } else {
        mostrarError("No hay suficiente stock");
      }
    }
  });
  return carrito;
}

function restarStock(producto) {
  producto.stock--;
}

function agregarProducto(listaCarrito) {
  let nodoCarrito = obtenerCarritoHTML();
  listaCarrito.forEach((producto)=>{
    let nodo = document.createElement("p");
    nodo.innerText = producto.id + " " + producto.nombre + " " + producto.tipo + " " + producto.marca + " " + producto.precio + " " ;
    nodoCarrito.appendChild(nodo);
  })
}

function mostrarError(mensaje){
    alert(mensaje);
}

function obtenerCarritoHTML(){
  let nodoCarrito = document.getElementById("carrito");
  nodoCarrito.innerHTML=""
  return nodoCarrito;
}

function comprar(carrito){
  let mensaje = "Productos comprados \n";
  let total = 0;
  carrito.forEach((element) =>{
    mensaje = mensaje + element.nombre + "     precio: " + element.precio + "\n"
    total = parseInt(total) + parseInt(element.precio);
  })
  mensaje = mensaje + "total : " + total;
  alert (mensaje);
  carrito = obtenerCarritoHTML();
}