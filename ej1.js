const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inventario = [];
let contadorId = 1;

function mostrarMenu() {
  console.log("\n=== GESTIÓN DE INVENTARIO ===");
  console.log("1. Registrar un producto");
  console.log("2. Mostrar todos los productos");
  console.log("3. Buscar un producto por su ID");
  console.log("4. Salir del programa");

  rl.question("\nSeleccione una opción (1-4): ", (opcion) => {
    switch (opcion.trim()) {
      case "1":
        registrarProducto();
        break;
      case "2":
        mostrarProductos();
        break;
      case "3":
        buscarPorId();
        break;
      case "4":
        console.log("\nSaliendo del sistema...");
        rl.close();
        break;
      default:
        console.log("\nOpción no válida. Intente de nuevo.");
        mostrarMenu();
        break;
    }
  });
}

function registrarProducto() {
  rl.question("\nNombre del producto: ", (nombre) => {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) {
      console.log("El nombre no puede estar vacío.");
      return mostrarMenu();
    }

    rl.question("Precio del producto: ", (precioTexto) => {
      const precio = parseFloat(precioTexto);
      if (isNaN(precio) || precio < 0) {
        console.log("Precio inválido. Debe ser un número positivo.");
        return mostrarMenu();
      }

      rl.question("Cantidad en stock: ", (stockTexto) => {
        const stock = parseInt(stockTexto);
        if (isNaN(stock) || stock < 0) {
          console.log("Stock inválido. Debe ser un número entero positivo.");
          return mostrarMenu();
        }

        const nuevoProducto = {
          id: contadorId++,
          nombre: nombreLimpio,
          precio: precio,
          stock: stock,
        };

        inventario.push(nuevoProducto);
        console.log(`\nProducto "${nuevoProducto.nombre}" registrado con ID #${nuevoProducto.id}.`);
        mostrarMenu();
      });
    });
  });
}

function mostrarProductos() {
  console.log("\n--- LISTA DE PRODUCTOS ---");
  if (inventario.length === 0) {
    console.log("El inventario está vacío.");
  } else {
    inventario.forEach((prod) => {
      console.log(
        `ID: ${prod.id} | Nombre: ${prod.nombre} | Precio: $${prod.precio.toFixed(2)} | Stock: ${prod.stock}`
      );
    });
  }
  mostrarMenu();
}

function buscarPorId() {
  if (inventario.length === 0) {
    console.log("\nEl inventario está vacío. No hay productos para buscar.");
    return mostrarMenu();
  }

  rl.question("\nIngrese el ID del producto a buscar: ", (idTexto) => {
    const idBuscado = parseInt(idTexto);
    const productoEncontrado = inventario.find((prod) => prod.id === idBuscado);

    if (productoEncontrado) {
      console.log("\n--- PRODUCTO ENCONTRADO ---");
      console.log(`ID: ${productoEncontrado.id}`);
      console.log(`Nombre: ${productoEncontrado.nombre}`);
      console.log(`Precio: $${productoEncontrado.precio.toFixed(2)}`);
      console.log(`Stock: ${productoEncontrado.stock} unidades`);
    } else {
      console.log(`\nNo se encontró ningún producto con el ID #${idTexto.trim()}.`);
    }

    mostrarMenu();
  });
}

// Iniciar programa
mostrarMenu();