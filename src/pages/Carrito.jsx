import { Link, useNavigate } from "react-router-dom";

export default function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();

  const cambiarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      setCarrito(carrito.filter((item) => item.id !== id));
    } else {
      setCarrito(
        carrito.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
      );
    }
  };

  const quitarItem = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>Mi carrito de compras</h1>
            </div>
          </div>

          {carrito.length === 0 ? (
            <div>
              <p>Tu carrito está vacío.</p>
              <Link to="/productos" className="btn btn--dark" style={{ marginTop: "1rem" }}>Ver productos</Link>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <div style={{ flex: 2, minWidth: "280px" }}>
                {carrito.map((item) => (
                  <div key={item.id} className="cart-item" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 0", borderBottom: "2px dashed var(--line)" }}>
                    <img src={item.imagen} alt={item.nombre} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", border: "2px solid var(--ink)" }} />
                    <div style={{ flexGrow: 1 }}>
                      <strong>{item.nombre}</strong>
                      <p>${item.precio.toLocaleString("es-CL")} c/u</p>
                    </div>
                    <div className="qty-controls">
                      <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>-</button>
                      <input type="number" value={item.cantidad} readOnly style={{ width: "40px", textAlign: "center" }} />
                      <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                    </div>
                    <p style={{ fontWeight: "bold", minWidth: "80px", textAlign: "right" }}>
                      ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                    </p>
                    <button className="btn btn-danger btn-small" onClick={() => quitarItem(item.id)}>Quitar</button>
                  </div>
                ))}
              </div>

              <aside className="cart-summary" style={{ flex: 1, minWidth: "240px", height: "fit-content" }}>
                <h2>Total: ${total.toLocaleString("es-CL")}</h2>
                <div className="form-group">
                  <label htmlFor="cupon">Cupón de descuento</label>
                  <input type="text" id="cupon" placeholder="Ingresa tu cupón" />
                </div>
                <button onClick={() => navigate("/checkout")} className="btn" style={{ width: "100%", justifyContent: "center" }}>
                  Proceder al Pago
                </button>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}