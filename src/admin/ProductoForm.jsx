import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { obtenerProductos, guardarProductos } from "../data/productos";

export default function ProductoForm() {
  const navigate = useNavigate();
  const idAEditar = localStorage.getItem("productoAEditarId");

  const [form, setForm] = useState({
    codigo: "", nombre: "", descripcion: "", precio: "", stock: "", stockCritico: "", categoria: "Completos", imagen: ""
  });

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!sesion || sesion.tipoUsuario !== "Administrador") {
      alert("Solo un Administrador puede crear o editar productos.");
      navigate("/admin/productos");
      return;
    }

    if (idAEditar) {
      const productos = obtenerProductos();
      const prod = productos.find(p => p.id === Number(idAEditar));
      if (prod) {
        setForm({
          codigo: prod.codigo,
          nombre: prod.nombre,
          descripcion: prod.descripcion || "",
          precio: prod.precio,
          stock: prod.stock,
          stockCritico: prod.stockCritico || "",
          categoria: prod.categoria,
          imagen: prod.imagen || ""
        });
      }
    }
  }, [idAEditar, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.codigo.length < 3 || !form.nombre || form.precio < 0 || form.stock < 0) {
      alert("Por favor revise los campos: hay datos inválidos o incompletos.");
      return;
    }

    const productos = obtenerProductos();
    const datosNuevos = {
      codigo: form.codigo,
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico) || 0,
      categoria: form.categoria,
      imagen: form.imagen || "img/completo-italiano.PNG"
    };

    if (idAEditar) {
      const index = productos.findIndex(p => p.id === Number(idAEditar));
      if (index !== -1) {
        productos[index] = { ...productos[index], ...datosNuevos };
      }
      localStorage.removeItem("productoAEditarId");
    } else {
      const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
      productos.push({ id: nuevoId, ...datosNuevos });
    }

    guardarProductos(productos);
    alert("Producto guardado con éxito.");
    navigate("/admin/productos");
  };

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
        <h1>{idAEditar ? "Editar Producto" : "Nuevo Producto"}</h1>
        <form onSubmit={handleSubmit} className="form-box" style={{ maxWidth: "500px" }}>
          <div className="form-group">
            <label>Código de producto (mín 3 carac.)</label>
            <input type="text" name="codigo" value={form.codigo} onChange={handleChange} minLength="3" required />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} maxLength="100" required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" maxLength="500"></textarea>
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input type="number" name="precio" value={form.precio} onChange={handleChange} min="0" required />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" required />
          </div>
          <div className="form-group">
            <label>Stock crítico</label>
            <input type="number" name="stockCritico" value={form.stockCritico} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} required>
              <option value="Completos">Completos</option>
              <option value="Sándwiches">Sándwiches</option>
              <option value="Papas Fritas">Papas Fritas</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ruta de imagen</label>
            <input type="text" name="imagen" value={form.imagen} onChange={handleChange} placeholder="img/completo-italiano.PNG" />
          </div>
          <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </form>
      </main>
    </div>
  );
}