import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { productosIniciales, limpiarRutaImagen, manejarErrorImagen } from "../data/productos";

export default function DetalleProducto({ setCarrito, carrito }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);

  const listaProductos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;
  const producto = listaProductos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <main className="section container">
        <p>Producto no encontrado.</p>
        <Link to="/productos" className="btn btn--dark">Volver a productos</Link>
      </main>
    );
  }

  const agregarAlCarrito = () => {
    const cant = Math.max(1, Number(cantidad) || 1);
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cant } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, imagen: limpiarRutaImagen(producto.imagen), cantidad: cant }]);
    }
    alert("Producto añadido al carrito");
    navigate("/carrito");
  };

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <p className="breadcrumb">
            <Link to="/productos">Productos</Link> / {producto.nombre}
          </p>

          <div className="post-hero">
            <img
              src={limpiarRutaImagen(producto.imagen)}
              alt={producto.nombre}
              onError={manejarErrorImagen}
            />
          </div>

          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p className="product-price" style={{ fontSize: "1.6rem" }}>
            ${producto.precio.toLocaleString("es-CL")}
          </p>

          <div className="form-group" style={{ maxWidth: "140px" }}>
            <label htmlFor="cantidad">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <button onClick={agregarAlCarrito} className="btn">
            Añadir al carrito
          </button>
        </div>
      </section>
    </main>
  );
}