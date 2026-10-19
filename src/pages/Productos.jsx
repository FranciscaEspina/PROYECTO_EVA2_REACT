import { Link } from "react-router-dom";
import { productosIniciales, limpiarRutaImagen, manejarErrorImagen } from "../data/productos";

export default function Productos() {
  const listaProductos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>Nuestro menú</h1>
              <p>Todo lo que preparamos, listo para pedir.</p>
            </div>
          </div>

          <div className="product-grid">
            {listaProductos.map((producto) => (
              <article className="product-card" key={producto.id}>
                <img
                  src={limpiarRutaImagen(producto.imagen)}
                  alt={producto.nombre}
                  width="200"
                  height="150"
                  onError={manejarErrorImagen}
                />
                <p className="product-name">{producto.nombre}</p>
                {producto.stock <= producto.stockCritico && (
                  <p style={{ color: "var(--paprika)", fontWeight: 700, fontSize: ".85rem" }}>
                    ¡Quedan pocas unidades!
                  </p>
                )}
                <div className="product-row">
                  <span className="product-price">${producto.precio.toLocaleString("es-CL")}</span>
                  <Link to={`/producto/${producto.id}`} className="add-btn btn-ver">
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}