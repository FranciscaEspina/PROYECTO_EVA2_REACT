import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { obtenerUsuarios, eliminarUsuario as borrarUsuario } from "../data/usuarios";

export default function AdminUsuarios() {
  const [sesion, setSesion] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!usuarioActivo || usuarioActivo.tipoUsuario === "Cliente") {
      navigate("/login");
      return;
    }
    setSesion(usuarioActivo);

    setUsuarios(obtenerUsuarios());
  }, [navigate]);

  const eliminarUsuario = (run) => {
    if (sesion?.tipoUsuario !== "Administrador") {
      alert("Solo un Administrador puede eliminar usuarios.");
      return;
    }
    if (!window.confirm("¿Eliminar este usuario?")) return;
    borrarUsuario(run);
    setUsuarios(obtenerUsuarios());
  };

  if (!sesion) return null;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Al<span style={{ color: "var(--mustard)" }}>Toque</span></h2>
        <ul>
          <li><Link to="/admin/home">Inicio</Link></li>
          <li><Link to="/admin/productos">Productos</Link></li>
          <li><Link to="/admin/usuarios" className="active">Usuarios</Link></li>
          <li><Link to="/">Volver al sitio</Link></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>Usuarios</h1>
        {sesion.tipoUsuario === "Administrador" && (
          <p>
            <Link to="/admin/usuarios/nuevo" className="btn btn-primary mb-3">+ Nuevo usuario</Link>
          </p>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>RUT / RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              {sesion.tipoUsuario === "Administrador" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr><td colSpan="5">No hay usuarios registrados.</td></tr>
            ) : (
              usuarios.map((usu) => (
                <tr key={usu.run}>
                  <td>{usu.run}</td>
                  <td>{usu.nombre} {usu.apellidos}</td>
                  <td>{usu.correo}</td>
                  <td>{usu.tipoUsuario || "Cliente"}</td>
                  {sesion.tipoUsuario === "Administrador" && (
                    <td>
                      <button className="btn btn-secondary btn-small me-2" onClick={() => navigate(`/admin/usuarios/editar/${usu.run}`)}>Editar</button>
                      <button className="btn btn-danger btn-small" onClick={() => eliminarUsuario(usu.run)}>Eliminar</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}