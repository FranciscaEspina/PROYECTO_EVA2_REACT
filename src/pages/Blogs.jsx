import { Link } from "react-router-dom";
import { manejarErrorImagen } from "../data/productos";

export default function Blogs() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>Noticias importantes</h1>
              <p>Historias, datos curiosos y novedades del mundo de la comida al paso.</p>
            </div>
          </div>

          <div className="blog-grid">
            <article className="blog-card">
              <img
                src="/img/el-origen.PNG"
                alt="Completo italiano"
                width="200"
                height="200"
                onError={manejarErrorImagen}
              />
              <div>
                <span className="tag">Caso curioso #1</span>
                <h3>¿Por qué el completo se llama "italiano"?</h3>
                <p>Un repaso rápido al origen de los colores que homenajean la bandera italiana en el sándwich más pedido de Chile.</p>
                <Link to="/blog/1" className="btn btn--dark">Ver caso</Link>
              </div>
            </article>

            <article className="blog-card">
              <img
                src="/img/como-hacer-papas-rus.PNG"
                alt="Papas rústicas"
                width="200"
                height="200"
                onError={manejarErrorImagen}
              />
              <div>
                <span className="tag">Caso curioso #2</span>
                <h3>El truco para que las papas queden crujientes</h3>
                <p>La doble cocción, el corte y el reposo: tres pasos simples que marcan la diferencia en las papas rústicas.</p>
                <Link to="/blog/2" className="btn btn--dark">Ver caso</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}