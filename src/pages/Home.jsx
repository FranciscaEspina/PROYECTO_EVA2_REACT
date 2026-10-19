import { Link } from "react-router-dom";
import { productosIniciales, limpiarRutaImagen, manejarErrorImagen } from "../data/productos";

export default function Home({ setCarrito, carrito }) {
  const listaProductos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;
  const destacados = listaProductos.slice(0, 4);

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
  };

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <span className="hero-eyebrow">Listo en minutos</span>
            <h1>Comida al paso, hecha al toque.</h1>
            <p>Sándwiches, completos y papas rústicas preparados frente a ti. Pides, esperas poco y comes bien — así de simple.</p>
            <div className="hero-actions">
              <Link to="/productos" className="btn">Ver el menú</Link>
              <Link to="/nosotros" className="btn btn--ghost">Conócenos</Link>
            </div>
          </div>
          <div className="hero-art">
            <img src="/img/al-toque.jpg" alt="Nuestro local" width="480" height="380" onError={manejarErrorImagen} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Destacados de hoy</h2>
              <p>Lo que más se pide en el mesón, directo a tu bandeja.</p>
            </div>
            <Link to="/productos" className="btn btn--dark">Ver todo el menú</Link>
          </div>

          <div className="product-grid">
            {destacados.map((producto) => (
              <article className="product-card" key={producto.id}>
                <img
                  src={limpiarRutaImagen(producto.imagen)}
                  alt={producto.nombre}
                  width="200"
                  height="150"
                  onError={manejarErrorImagen}
                />
                <p className="product-name">{producto.nombre}</p>
                <div className="product-row">
                  <span className="product-price">${producto.precio.toLocaleString("es-CL")}</span>
                  <button
                    className="add-btn"
                    type="button"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Añadir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="container">
          <h3>¿Con hambre urgente?</h3>
          <p>Pide en el local o retira para llevar — sin filas eternas.</p>
        </div>
      </div>
    </main>
  );
}