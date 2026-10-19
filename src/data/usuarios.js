// Operaciones CRUD para Usuarios (persistidas en localStorage)
export const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
export const TIPOS_USUARIO = ["Cliente", "Vendedor", "Administrador"];

// READ
export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

export function obtenerUsuarioPorRun(run) {
  return obtenerUsuarios().find((u) => u.run === run);
}

export function guardarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

// CREATE
export function crearUsuario(usuario) {
  const lista = obtenerUsuarios();
  lista.push(usuario);
  guardarUsuarios(lista);
  return usuario;
}

// UPDATE (identifica al usuario por su RUN)
export function actualizarUsuario(run, cambios) {
  const lista = obtenerUsuarios().map((u) => (u.run === run ? { ...u, ...cambios } : u));
  guardarUsuarios(lista);
}

// DELETE
export function eliminarUsuario(run) {
  guardarUsuarios(obtenerUsuarios().filter((u) => u.run !== run));
}

// Validación compartida. `runOriginal` se usa al editar para no marcar duplicado al propio usuario.
export function validarUsuario(form, { esEdicion = false, runOriginal = null } = {}) {
  const errores = {};
  const lista = obtenerUsuarios();

  if (!form.run.trim()) errores.run = "El RUT es obligatorio";
  else if (form.run.includes(".") || form.run.includes("-")) errores.run = "Ingrese el RUT sin puntos ni guión";
  else if (form.run.length < 8 || form.run.length > 9) errores.run = "El RUT debe tener entre 8 y 9 caracteres";
  else if (lista.some((u) => u.run === form.run && u.run !== runOriginal)) errores.run = "Ya existe un usuario con ese RUT";

  if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!form.apellidos.trim()) errores.apellidos = "Los apellidos son obligatorios";

  if (!form.correo.trim()) errores.correo = "El correo es obligatorio";
  else if (!DOMINIOS_PERMITIDOS.some((d) => form.correo.endsWith(d))) errores.correo = "Correo no permitido (@duoc.cl, @profesor.duoc.cl, @gmail.com)";
  else if (form.correo === "admin@duoc.cl" || lista.some((u) => u.correo === form.correo && u.run !== runOriginal)) errores.correo = "Ese correo ya está registrado";

  // En edición la contraseña es opcional: vacía = se conserva la actual.
  if (!esEdicion || form.password) {
    if (form.password.length < 4 || form.password.length > 10) errores.password = "Debe tener entre 4 y 10 caracteres";
  }

  return errores;
}