import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { crearUsuario, actualizarUsuario, obtenerUsuarioPorRun, validarUsuario, TIPOS_USUARIO } from "../data/usuarios";

const FORM_VACIO = {
  run: "", nombre: "", apellidos: "", correo: "", fechaNacimiento: "",
  region: "", comuna: "", direccion: "", tipoUsuario: "Cliente", password: ""
};

export default function UsuarioForm() {
  const navigate = useNavigate();
  const { run: runAEditar } = useParams(); // si existe => modo edición
  const esEdicion = Boolean(runAEditar);

  const usuarioExistente = esEdicion ? obtenerUsuarioPorRun(runAEditar) : null;
  const existe = Boolean(usuarioExistente);
  const [form, setForm] = useState(() =>
    usuarioExistente
      ? { ...FORM_VACIO, ...usuarioExistente, tipoUsuario: usuarioExistente.tipoUsuario || "Cliente", password: "" }
      : FORM_VACIO
  );
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const sesion = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (!sesion || sesion.tipoUsuario !== "Administrador") {
      alert("Solo un Administrador puede crear o editar usuarios.");
      navigate("/admin/usuarios");
      return;
    }

    if (esEdicion && !existe) {
      alert("No se encontró el usuario a editar.");
      navigate("/admin/usuarios");
    }
  }, [esEdicion, existe, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarUsuario(form, { esEdicion, runOriginal: esEdicion ? runAEditar : null });
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const { password, ...datos } = form;
    if (esEdicion) {
      const cambios = { ...datos };
      if (password) cambios.contrasena = password; // vacío = conserva la contraseña actual
      actualizarUsuario(runAEditar, cambios);
    } else {
      crearUsuario({ ...datos, contrasena: password });
    }
    navigate("/admin/usuarios");
  };

  const campoError = (nombre) =>
    errores[nombre] && <small className="error-message" style={{ display: "block" }}>{errores[nombre]}</small>;

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
        <h1>{esEdicion ? "Editar usuario" : "Nuevo usuario"}</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${errores.run ? "invalid" : ""}`}>
            <label>RUT (sin puntos ni guión)</label>
            <input type="text" name="run" maxLength="9" value={form.run} onChange={handleChange} />
            {campoError("run")}
          </div>

          <div className={`form-group ${errores.nombre ? "invalid" : ""}`}>
            <label>Nombre</label>
            <input type="text" name="nombre" maxLength="50" value={form.nombre} onChange={handleChange} />
            {campoError("nombre")}
          </div>

          <div className={`form-group ${errores.apellidos ? "invalid" : ""}`}>
            <label>Apellidos</label>
            <input type="text" name="apellidos" maxLength="100" value={form.apellidos} onChange={handleChange} />
            {campoError("apellidos")}
          </div>

          <div className={`form-group ${errores.correo ? "invalid" : ""}`}>
            <label>Correo electrónico</label>
            <input type="email" name="correo" maxLength="100" value={form.correo} onChange={handleChange} />
            {campoError("correo")}
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Región</label>
            <select name="region" value={form.region} onChange={handleChange}>
              <option value="">Seleccione región</option>
              <option value="metropolitana">Metropolitana</option>
              <option value="valparaiso">Valparaíso</option>
              <option value="biobio">Biobío</option>
            </select>
          </div>

          <div className="form-group">
            <label>Comuna</label>
            <select name="comuna" value={form.comuna} onChange={handleChange}>
              <option value="">Seleccione comuna</option>
              <option value="La Florida">La Florida</option>
              <option value="Puente Alto">Puente Alto</option>
              <option value="Isla Maipo">Isla Maipo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input type="text" name="direccion" maxLength="300" value={form.direccion} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Tipo de usuario</label>
            <select name="tipoUsuario" value={form.tipoUsuario} onChange={handleChange}>
              {TIPOS_USUARIO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className={`form-group ${errores.password ? "invalid" : ""}`}>
            <label>{esEdicion ? "Nueva contraseña (dejar vacío para mantener la actual)" : "Contraseña (4 a 10 caracteres)"}</label>
            <input type="password" name="password" maxLength="10" value={form.password} onChange={handleChange} />
            {campoError("password")}
          </div>

          <button type="submit" className="btn">{esEdicion ? "Guardar cambios" : "Crear usuario"}</button>{" "}
          <Link to="/admin/usuarios" className="btn btn--dark">Cancelar</Link>
        </form>
      </main>
    </div>
  );
}