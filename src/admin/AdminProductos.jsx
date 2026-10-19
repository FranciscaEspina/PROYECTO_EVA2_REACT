import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { obtenerProductos, guardarProductos, limpiarRutaImagen, manejarErrorImagen } from "../data/productos";

export default function AdminProductos() {
  const [sesion, setSesion] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!usuarioActivo || usuarioActivo.tipoUsuario === "Cliente") {
      navigate("/login");
      return;
    }
    setSesion(usuarioActivo);
    setProductos(obtenerProductos());
  }, [navigate]);

  const eliminarProducto = (id) => {
    if (sesion?.tipoUsuario !== "Administrador") {
      alert("Solo un Administrador puede eliminar productos.");
      return;
    }
    const actualizados = productos.filter((p) => p.id !== id);
    setProductos(actualizados);
    guardarProductos(actualizados);
  };

  const editarProducto = (id) => {
    localStorage.setItem("productoAEditarId", id);
    navigate("/admin/producto-form");
  };

  if (!sesion) return null;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Al<span style={{ color: "var(--mustard)" }}>Toque</span></h2>
        <ul>
          <li><Link to="/admin/home">Inicio</Link></li>
          <li><Link to="/admin/productos" className="active">Productos</Link></li>
          <li><Link to="/admin/usuarios">Usuarios</Link></li>
          <li><Link to="/">Volver al sitio</Link></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Productos</h1>
        {sesion.tipoUsuario === "Administrador" && (
          <p>
            <button className="btn btn-primary mb-3" onClick={() => { localStorage.removeItem("productoAEditarId"); navigate("/admin/producto-form"); }}>
              + Nuevo producto
            </button>
          </p>
        )}

        <table className="admin-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              {sesion.tipoUsuario === "Administrador" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img
                    src={limpiarRutaImagen(prod.imagen)}
                    alt={prod.nombre}
                    onError={manejarErrorImagen}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{prod.codigo}</td>
                <td>{prod.nombre}</td>
                <td>${prod.precio.toLocaleString("es-CL")}</td>
                <td>{prod.stock}</td>
                <td>{prod.categoria}</td>
                {sesion.tipoUsuario === "Administrador" && (
                  <td>
                    <button className="btn btn-secondary btn-small me-2" onClick={() => editarProducto(prod.id)}>Editar</button>
                    <button className="btn btn-danger btn-small" onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}