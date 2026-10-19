import { useState } from "react";
import { Link } from "react-router-dom";
import { productosIniciales, limpiarRutaImagen, manejarErrorImagen } from "../data/productos";

export default function Categorias({ setCarrito, carrito }) {
  const listaProductos = JSON.parse(localStorage.getItem("productos")) || productosIniciales;
  const categoriasUnicas = [...new Set(listaProductos.map((p) => p.categoria))];
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  const agregarAlCarrito = (producto) => {
    if (!setCarrito || !carrito) return;
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

  const categoriasAMostrar =
    categoriaActiva === "Todas"
      ? categoriasUnicas
      : categoriasUnicas.filter((c) => c === categoriaActiva);

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>Categorías</h1>
              <p>Explora nuestras preparaciones separadas por categoría.</p>
            </div>
            {categoriaActiva !== "Todas" && (
              <button className="btn btn--dark" onClick={() => setCategoriaActiva("Todas")}>
                Ver todas las categorías
              </button>
            )}
          </div>

          {/* Tarjetas superiores de selección de categoría */}
          <div className="row g-4 mb-5">
            {categoriasUnicas.map((cat) => {
              const productoEjemplo = listaProductos.find((p) => p.categoria === cat);
              const activa = categoriaActiva === cat;
              return (
                <div className="col-12 col-sm-6 col-md-3" key={cat}>
                  <div
                    className="product-card h-100 d-flex flex-column justify-content-between"
                    style={{
                      cursor: "pointer",
                      transform: "none",
                      outline: activa ? "3px solid var(--paprika)" : "none",
                    }}
                    onClick={() => setCategoriaActiva(activa ? "Todas" : cat)}
                  >
                    <div>
                      {productoEjemplo && (
                        <img
                          src={limpiarRutaImagen(productoEjemplo.imagen)}
                          alt={cat}
                          onError={manejarErrorImagen}
                          style={{ width: "100%", height: "140px", objectFit: "cover" }}
                        />
                      )}
                      <h3 className="mt-2 mb-1">{cat}</h3>
                    </div>
                    <span className="tag" style={{ color: "var(--paprika)", fontWeight: 700 }}>
                      {activa ? "Mostrando categoría ✓" : "Filtrar categoría →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Listado de productos separados por cada categoría */}
          {categoriasAMostrar.map((cat) => {
            const productosDeCategoria = listaProductos.filter((p) => p.categoria === cat);
            return (
              <div key={cat} className="mb-5">
                <div className="section-head">
                  <h2>{cat}</h2>
                </div>
                <div className="product-grid">
                  {productosDeCategoria.map((producto) => (
                    <article className="product-card" key={producto.id}>
                      <img
                        src={limpiarRutaImagen(producto.imagen)}
                        alt={producto.nombre}
                        onError={manejarErrorImagen}
                        width="200"
                        height="150"
                      />
                      <p className="product-name">{producto.nombre}</p>
                      <div className="product-row">
                        <span className="product-price">
                          ${producto.precio.toLocaleString("es-CL")}
                        </span>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <Link to={`/producto/${producto.id}`} className="add-btn">
                            Detalle
                          </Link>
                          {setCarrito && (
                            <button
                              type="button"
                              className="add-btn"
                              onClick={() => agregarAlCarrito(producto)}
                            >
                              Añadir
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}