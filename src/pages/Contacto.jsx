import { useState } from "react";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: "640px" }}>
        <section className="contacto-container">
          <h2>Contacto</h2>
          <p>Envianos tus consultas o comentarios</p>

          {enviado ? (
            <div className="alert alert-success">¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="nombreContacto">Nombre</label>
                <input type="text" id="nombreContacto" required maxLength="100" />
              </div>
              <div className="form-group">
                <label htmlFor="correoContacto">Correo Electrónico</label>
                <input type="email" id="correoContacto" required maxLength="100" />
              </div>
              <div className="form-group">
                <label htmlFor="comentario">Comentario</label>
                <textarea id="comentario" required maxLength="500" rows="6"></textarea>
              </div>
              <button type="submit" className="btn">Enviar</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}