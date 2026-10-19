import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminHome() {
  const [sesion, setSesion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!usuarioActivo || usuarioActivo.tipoUsuario === "Cliente") {
      alert("No tienes permisos para acceder al panel de administración.");
      navigate("/login");
      return;
    }
    setSesion(usuarioActivo);
  }, [navigate]);

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  if (!sesion) return null;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Al<span style={{ color: "var(--mustard)" }}>Toque</span></h2>
        <ul>
          <li><Link to="/admin/home" className="active">Inicio</Link></li>
          <li><Link to="/admin/productos">Productos</Link></li>
          <li><Link to="/admin/usuarios">Usuarios</Link></li>
          <li><Link to="/">Volver al sitio</Link></li>
          <li><Link to="#" onClick={cerrarSesion}>Cerrar sesión</Link></li>
        </ul>
      </aside>

      <main className="admin-content">
        <h1>¡Hola Administrador!</h1>
        <p>Sesión iniciada como {sesion.nombre || sesion.correo} ({sesion.tipoUsuario}).</p>

        {sesion.tipoUsuario === "Vendedor" && (
          <div className="alert alert-warning">
            Estás conectado como <strong>Vendedor</strong>: solo puedes visualizar productos y usuarios.
          </div>
        )}
      </main>
    </div>
  );
}