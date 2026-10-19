import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validarStockCarrito, descontarStock } from "../data/productos";

export default function Checkout({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo") || "null");

  const [form, setForm] = useState({
    nombre: usuarioActivo?.nombre || "",
    apellidos: usuarioActivo?.apellidos || "",
    correo: usuarioActivo?.correo || "",
    calle: usuarioActivo?.direccion || "",
    depto: "",
    region: usuarioActivo?.region || "Región Metropolitana de Santiago",
    comuna: usuarioActivo?.comuna || "Puente Alto",
    indicaciones: "",
    simularError: false // Permite probar la pantalla de error exigida en la pauta
  });

  const [resultado, setResultado] = useState(null); // 'exito' o 'error'
  const [nroOrden, setNroOrden] = useState(null);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const sinStock = validarStockCarrito(carrito);
      if (sinStock.length > 0) {
        const detalle = sinStock.map((x) => `${x.nombre} (pediste ${x.solicitado}, quedan ${x.disponible})`).join("\n");
          alert("No hay stock suficiente para:\n" + detalle + "\n\nAjusta las cantidades en tu carrito.");
          navigate("/carrito");
      return;
    }


    if (form.simularError) {
      setResultado("error");
    } else {
      const ordenId = "AT-" + Math.floor(100000 + Math.random() * 900000);
      descontarStock(carrito); // solo se descuenta cuando el pago es exitoso
      setNroOrden(ordenId);
      setResultado("exito");
      setCarrito([]);
      localStorage.removeItem("carrito");
    }
  };

  if (resultado === "exito") {
    return (
      <main className="section container" style={{ maxWidth: "700px" }}>
        <div className="alert alert-success p-5 text-center" style={{ border: "3px solid var(--ink)", background: "var(--paper-light)" }}>
          <h1 style={{ color: "var(--palta)" }}>¡Compra Exitosa!</h1>
          <p><strong>Número de Orden:</strong> {nroOrden}</p>
          <p>Gracias por tu compra, <strong>{form.nombre} {form.apellidos}</strong>.</p>
          <p>Tus productos serán enviados a: <em>{form.calle}, Comuna de {form.comuna}</em>.</p>
          <div className="mt-4">
            <Link to="/" className="btn">Volver al inicio</Link>
          </div>
        </div>
      </main>
    );
  }

  if (resultado === "error") {
    return (
      <main className="section container" style={{ maxWidth: "700px" }}>
        <div className="alert p-5 text-center" style={{ border: "3px solid var(--paprika)", background: "#fdf2f2" }}>
          <h1 style={{ color: "var(--paprika)" }}>No se pudo realizar el pago</h1>
          <p>Lo sentimos, la transacción fue rechazada por la entidad bancaria o los datos de pago son incorrectos.</p>
          <div className="mt-4" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button className="btn" onClick={() => setResultado(null)}>Reintentar pago</button>
            <Link to="/carrito" className="btn btn--dark">Volver al carrito</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section container" style={{ maxWidth: "800px" }}>
      <h2>Finalizar Compra / Checkout</h2>
      {usuarioActivo && (
        <div className="alert alert-warning mb-4">
          ¡Hola de nuevo, <strong>{usuarioActivo.nombre}</strong>! Tus datos personales y de dirección se han rellenado automáticamente.
        </div>
      )}

      {carrito.length === 0 ? (
        <div>
          <p>No tienes productos en el carrito para procesar el pago.</p>
          <Link to="/productos" className="btn btn--dark mt-2">Ver productos</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm" style={{ border: "3px solid var(--ink) !important", background: "var(--paper-light)" }}>
          
          {/* Resumen de la orden */}
          <h4 className="mb-3">1. Resumen de tu pedido</h4>
          <ul className="list-group mb-4">
            {carrito.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.nombre} (x{item.cantidad})</span>
                <strong>${(item.precio * item.cantidad).toLocaleString("es-CL")}</strong>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
              <span>Total a pagar:</span>
              <strong>${total.toLocaleString("es-CL")}</strong>
            </li>
          </ul>

          <h4 className="mb-3">2. Datos de Envío y Cliente</h4>
          <div className="row mb-3">
            <div className="col-md-6 form-group">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="col-md-6 form-group">
              <label className="form-label">Apellidos</label>
              <input type="text" className="form-control" name="apellidos" value={form.apellidos} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3 form-group">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} required />
          </div>

          <div className="row mb-3">
            <div className="col-md-8 form-group">
              <label className="form-label">Calle y Número</label>
              <input type="text" className="form-control" name="calle" value={form.calle} onChange={handleChange} required placeholder="Ej: Av. Vicuña Mackenna 4860" />
            </div>
            <div className="col-md-4 form-group">
              <label className="form-label">Depto / Casa (opcional)</label>
              <input type="text" className="form-control" name="depto" value={form.depto} onChange={handleChange} placeholder="Ej: Depto 42B" />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 form-group">
              <label className="form-label">Región</label>
              <input type="text" className="form-control" name="region" value={form.region} onChange={handleChange} required />
            </div>
            <div className="col-md-6 form-group">
              <label className="form-label">Comuna</label>
              <input type="text" className="form-control" name="comuna" value={form.comuna} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-4 form-group">
            <label className="form-label">Indicaciones para la entrega (opcional)</label>
            <textarea className="form-control" name="indicaciones" value={form.indicaciones} onChange={handleChange} rows="2" placeholder="Ej: Tocar timbre verde, dejar en conserjería..."></textarea>
          </div>

          {/* Opción didáctica para probar la pantalla de error que pide la rúbrica */}
          <div className="mb-4 form-check">
            <input type="checkbox" className="form-check-input" id="simularError" name="simularError" checked={form.simularError} onChange={handleChange} />
            <label className="form-check-label text-danger font-weight-bold" htmlFor="simularError">
              Simular error de pago en la pasarela (para probar pantalla de rechazo)
            </label>
          </div>

          <button type="submit" className="btn w-100" style={{ justifyContent: "center" }}>
            Pagar Pedido (${total.toLocaleString("es-CL")})
          </button>
        </form>
      )}
    </main>
  );
}