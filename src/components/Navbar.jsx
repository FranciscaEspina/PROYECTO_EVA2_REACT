import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ cartCount }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className={`container nav-bar ${menuAbierto ? "is-open" : ""}`}>
        <Link to="/" className="logo" onClick={() => setMenuAbierto(false)}>
          <img src="/img/logo.png" width="70" height="70" alt="Logo Al Toque" />
        </Link>

        <nav className="nav-links">
          <Link to="/" onClick={() => setMenuAbierto(false)}>Home</Link>
          <Link to="/productos" onClick={() => setMenuAbierto(false)}>Productos</Link>
          <Link to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link>
          <Link to="/nosotros" onClick={() => setMenuAbierto(false)}>Nosotros</Link>
          <Link to="/blogs" onClick={() => setMenuAbierto(false)}>Blogs</Link>
          <Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>
          {(usuarioActivo?.tipoUsuario === "Administrador" || usuarioActivo?.tipoUsuario === "Vendedor") && (
            <Link to="/admin/home" onClick={() => setMenuAbierto(false)} style={{ color: "var(--paprika)" }}>Panel Admin</Link>
          )}
        </nav>

        <div className="nav-actions">
          <div className="auth-links">
            {usuarioActivo ? (
              <span>
                Hola, <strong>{usuarioActivo.nombre || "Usuario"}</strong> ·{" "}
                <button onClick={cerrarSesion} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "bold", color: "var(--paprika)" }}>Salir</button>
              </span>
            ) : (
              <>
                <Link to="/login">Iniciar sesión</Link> · <Link to="/registro">Registrarse</Link>
              </>
            )}
          </div>
          <Link to="/carrito" className="cart" onClick={() => setMenuAbierto(false)}>
            🛒 Carrito (<span>{cartCount}</span>)
          </Link>
        </div>

        <button 
          className="nav-toggle" 
          aria-label="Abrir menú" 
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}