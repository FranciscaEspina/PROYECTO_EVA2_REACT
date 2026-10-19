import { Link } from "react-router-dom";
import { limpiarRutaImagen, manejarErrorImagen } from "../data/productos";

export default function ProductCard({ producto, onAgregar }) {
  return (
    <article className="product-card">
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
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <Link to={`/producto/${producto.id}`} className="add-btn btn-ver">
            Detalle
          </Link>
          {onAgregar && (
            <button
              className="add-btn"
              type="button"
              onClick={() => onAgregar(producto)}
            >
              Añadir
            </button>
          )}
        </div>
      </div>
    </article>
  );
}