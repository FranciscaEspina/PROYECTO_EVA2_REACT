import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({
    run: "", nombre: "", apellidos: "", correo: "", fechaNacimiento: "", region: "", comuna: "", direccion: "", password: "", confirmarPassword: ""
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    // Validar RUT (sin puntos ni guion, 8 a 9 caracteres)
    if (!form.run.trim()) {
      nuevosErrores.run = "El RUT es obligatorio";
    } else if (form.run.includes(".") || form.run.includes("-")) {
      nuevosErrores.run = "Ingrese el RUT sin puntos ni guión";
    } else if (form.run.length < 8 || form.run.length > 9) {
      nuevosErrores.run = "El RUT debe tener entre 8 y 9 caracteres";
    }

    // Validar Nombre y Apellidos
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.apellidos.trim()) nuevosErrores.apellidos = "Los apellidos son obligatorios";

    // Validar Correo
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else {
      const dominioValido = dominiosPermitidos.some(dom => form.correo.endsWith(dom));
      if (!dominioValido) nuevosErrores.correo = "Correo no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com)";
    }

    // Validar Contraseña (4 a 10 caracteres)
    if (form.password.length < 4 || form.password.length > 10) {
      nuevosErrores.password = "Debe tener entre 4 y 10 caracteres";
    }

    // Confirmar Contraseña
    if (form.password !== form.confirmarPassword) {
      nuevosErrores.confirmarPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some((u) => u.correo === form.correo)) {
      setErrores({ correo: "Ese correo ya está registrado" });
      return;
    }

    const nuevoUsuario = {
      run: form.run,
      nombre: form.nombre,
      apellidos: form.apellidos,
      correo: form.correo,
      fechaNacimiento: form.fechaNacimiento,
      region: form.region,
      comuna: form.comuna,
      direccion: form.direccion,
      tipoUsuario: "Cliente",
      contrasena: form.password,
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("¡Registro válido! Ahora puedes iniciar sesión.");
    navigate("/login");
  };

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: "640px" }}>
        <section className="registro-container">
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleRegistro} noValidate>
            <div className={`form-group ${errores.run ? "invalid" : ""}`}>
              <label>RUT (sin puntos ni guión)</label>
              <input type="text" name="run" maxLength="9" value={form.run} onChange={handleChange} />
              {errores.run && <small className="error-message" style={{ display: "block" }}>{errores.run}</small>}
            </div>

            <div className={`form-group ${errores.nombre ? "invalid" : ""}`}>
              <label>Nombre</label>
              <input type="text" name="nombre" maxLength="50" value={form.nombre} onChange={handleChange} />
              {errores.nombre && <small className="error-message" style={{ display: "block" }}>{errores.nombre}</small>}
            </div>

            <div className={`form-group ${errores.apellidos ? "invalid" : ""}`}>
              <label>Apellidos</label>
              <input type="text" name="apellidos" maxLength="100" value={form.apellidos} onChange={handleChange} />
              {errores.apellidos && <small className="error-message" style={{ display: "block" }}>{errores.apellidos}</small>}
            </div>

            <div className={`form-group ${errores.correo ? "invalid" : ""}`}>
              <label>Correo electrónico</label>
              <input type="email" name="correo" maxLength="100" value={form.correo} onChange={handleChange} />
              {errores.correo && <small className="error-message" style={{ display: "block" }}>{errores.correo}</small>}
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento</label>
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

            <div className={`form-group ${errores.password ? "invalid" : ""}`}>
              <label>Contraseña (4 a 10 caracteres)</label>
              <input type="password" name="password" minLength="4" maxLength="10" value={form.password} onChange={handleChange} />
              {errores.password && <small className="error-message" style={{ display: "block" }}>{errores.password}</small>}
            </div>

            <div className={`form-group ${errores.confirmarPassword ? "invalid" : ""}`}>
              <label>Confirmar Contraseña</label>
              <input type="password" name="confirmarPassword" value={form.confirmarPassword} onChange={handleChange} />
              {errores.confirmarPassword && <small className="error-message" style={{ display: "block" }}>{errores.confirmarPassword}</small>}
            </div>

            <button type="submit" className="btn">Registrarse</button>
          </form>
        </section>
      </div>
    </main>
  );
}