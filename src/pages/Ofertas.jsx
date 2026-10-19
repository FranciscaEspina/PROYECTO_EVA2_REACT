import { productosIniciales, limpiarRutaImagen, manejarErrorImagen } from "../data/productos";
import { Link } from "react-router-dom";

export default function Ofertas({ setCarrito, carrito }) {
  const listaProductos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;
  // Simulamos que los primeros 2 productos están en oferta con un 20% de descuento
  const productosEnOferta = listaProductos.slice(0, 2).map(p => ({
    ...p,
    precioOriginal: p.precio,
    precio: Math.round(p.precio * 0.8)
  }));

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, imagen: limpiarRutaImagen(producto.imagen), cantidad: 1 }]);
    }
    alert("¡Oferta añadida al carrito!");
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>Ofertas Imperdibles</h1>
              <p>Aprovecha nuestros descuentos especiales por tiempo limitado.</p>
            </div>
          </div>

          <div className="product-grid">
            {productosEnOferta.map((producto) => (
              <article className="product-card" key={producto.id} style={{ position: "relative" }}>
                <span style={{ position: "absolute", top: "10px", right: "10px", background: "var(--paprika)", color: "#fff", padding: "2px 8px", fontSize: "0.8rem", fontWeight: "bold", borderRadius: "4px" }}>
                  ¡20% OFF!
                </span>
                <img
                  src={limpiarRutaImagen(producto.imagen)}
                  alt={producto.nombre}
                  width="200"
                  height="150"
                  onError={manejarErrorImagen}
                />
                <p className="product-name">{producto.nombre}</p>
                <div className="product-row">
                  <div>
                    <span className="product-price" style={{ marginRight: "8px" }}>
                      ${producto.precio.toLocaleString("es-CL")}
                    </span>
                    <span style={{ textDecoration: "line-through", fontSize: "0.9rem", color: "#666" }}>
                      ${producto.precioOriginal.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <Link to={`/producto/${producto.id}`} className="add-btn">Detalle</Link>
                    <button className="add-btn" type="button" onClick={() => agregarAlCarrito(producto)}>
                      Añadir
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}