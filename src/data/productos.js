export const productosIniciales = [
  {
    id: 1,
    codigo: "COMP-001",
    nombre: "Completo italiano",
    descripcion: "Vienesa, palta fresca, tomate picado y mayonesa casera.",
    precio: 2200,
    stock: 40,
    stockCritico: 5,
    categoria: "Completos",
    imagen: "/img/completo-italiano.PNG",
  },
  {
    id: 2,
    codigo: "CHU-001",
    nombre: "Churrasco Al Toque",
    descripcion: "Churrasco de carne con nuestros aliños de la casa.",
    precio: 3500,
    stock: 25,
    stockCritico: 5,
    categoria: "Sándwiches",
    imagen: "/img/churrasco-italiano.jpg",
  },
  {
    id: 3,
    codigo: "PAP-001",
    nombre: "Papas rústicas",
    descripcion: "Doble cocción, corte grueso y reposo justo para quedar crujientes.",
    precio: 2800,
    stock: 30,
    stockCritico: 6,
    categoria: "Papas Fritas",
    imagen: "/img/papas-rusticas.PNG",
  },
  {
    id: 4,
    codigo: "EMP-001",
    nombre: "Empanada de pino",
    descripcion: "Empanada horneada rellena de pino tradicional.",
    precio: 1900,
    stock: 45,
    stockCritico: 8,
    categoria: "Sándwiches",
    imagen: "/img/empanadas-de-pino.jpg",
  },
  {
    id: 5,
    codigo: "BEB-001",
    nombre: "Bebida 350ml",
    descripcion: "Bebida a elección, lata de 350ml bien fría.",
    precio: 1200,
    stock: 60,
    stockCritico: 10,
    categoria: "Bebidas",
    imagen: "/img/bebidas.PNG",
  },
];

// Operaciones CRUD para Productos
export function obtenerProductos() {
  const guardado = localStorage.getItem("productos");
  if (!guardado) {
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  return JSON.parse(guardado);
}

export function guardarProductos(lista) {
  localStorage.setItem("productos", JSON.stringify(lista));
}

export function limpiarRutaImagen(ruta) {
  if (!ruta) return "";
  const limpia = ruta.replace(/^(\.\.\/)+/, "").replace(/^\/+/, "");
  return "/" + limpia;
}

export function manejarErrorImagen(e) {
  const img = e.currentTarget;
  const srcActual = decodeURIComponent(img.getAttribute("src") || "");
  if (!img.dataset.intentadoEspacios && srcActual.includes("-")) {
    img.dataset.intentadoEspacios = "true";
    img.src = srcActual.replace(/\/img\/(.+)$/, (_, nombre) => "/img/" + nombre.replace(/-/g, " "));
  }
}