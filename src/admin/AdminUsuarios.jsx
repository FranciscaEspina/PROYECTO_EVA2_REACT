import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    const guardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(guardados);
  }, [navigate]);

  const eliminarUsuario = (index) => {
    if (sesion?.tipoUsuario !== "Administrador") {
      alert("Solo un Administrador puede eliminar usuarios.");
      return;
    }
    const actualizados = usuarios.filter((_, i) => i !== index);
    setUsuarios(actualizados);
    localStorage.setItem("usuarios", JSON.stringify(actualizados));
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
              usuarios.map((usu, idx) => (
                <tr key={idx}>
                  <td>{usu.run}</td>
                  <td>{usu.nombre} {usu.apellidos}</td>
                  <td>{usu.correo}</td>
                  <td>{usu.tipoUsuario || "Cliente"}</td>
                  {sesion.tipoUsuario === "Administrador" && (
                    <td>
                      <button className="btn btn-danger btn-small" onClick={() => eliminarUsuario(idx)}>Eliminar</button>
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