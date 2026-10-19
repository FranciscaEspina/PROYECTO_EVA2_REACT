import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="logo">Al<span>Toque</span></p>
            <p>Comida al paso, rápida y bien hecha, en el corazón del barrio.</p>
          </div>
          <div>
            <h4>Categorías</h4>
            <ul>
              <li><Link to="/productos">Sándwiches</Link></li>
              <li><Link to="/productos">Completos</Link></li>
              <li><Link to="/productos">Bebidas</Link></li>
            </ul>
          </div>
          <div>
            <h4>Sitio</h4>
            <ul>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4>Mantente al tanto</h4>
            <p>Recibe promociones y novedades del local.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="tu@correo.com" required />
              <button type="submit" className="btn">Suscribirme</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Al Toque — Comida al paso.</span>
        </div>
      </div>
    </footer>
  );
}