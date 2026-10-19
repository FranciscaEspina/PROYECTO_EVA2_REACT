import { useParams, Link } from "react-router-dom";
import { manejarErrorImagen } from "../data/productos";

const articulosBlog = {
  "1": {
    tag: "Caso curioso #1",
    titulo: '¿Por qué el completo se llama "italiano"?',
    lectura: "5 min de lectura",
    categoria: "Datos curiosos",
    imagen: "/img/italiano-recien.PNG",
    alt: "Completo italiano recién preparado",
    parrafos: [
      "El completo italiano es probablemente el sándwich más pedido en cualquier local de comida al paso en Chile, y su nombre no es casualidad. Se llama así por los tres ingredientes que lo cubren: la palta (verde), el tomate (rojo) y la mayonesa (blanca), que juntos recuerdan los colores de la bandera de Italia.",
      "Aunque no hay un registro oficial de quién lo inventó primero, la combinación se popularizó a mediados del siglo XX en los locales de comida rápida de Santiago, y desde ahí se expandió a todo el país con pequeñas variaciones regionales.",
      "En Al Toque lo preparamos con vienesa, palta fresca molida en el momento, tomate picado y mayonesa casera — la receta de siempre, sin atajos."
    ]
  },
  "2": {
    tag: "Caso curioso #2",
    titulo: "El truco para que las papas queden crujientes",
    lectura: "4 min de lectura",
    categoria: "Datos curiosos",
    imagen: "/img/papas-recien-hechas.PNG",
    alt: "Papas rústicas recién fritas",
    parrafos: [
      "Lograr papas fritas crujientes por fuera y suaves por dentro no depende solo del aceite: depende de la técnica. El primer paso es el corte parejo, para que todas se cocinen al mismo ritmo.",
      "El segundo paso es la doble cocción: una primera pasada a temperatura media para cocinar el interior, y una segunda a temperatura alta justo antes de servir, que es la que genera la costra crujiente.",
      "Por último, el reposo entre una fritura y otra es clave — deja que el vapor salga antes de volver a sumergirlas. En Al Toque seguimos exactamente este proceso para nuestras papas rústicas."
    ]
  }
};

export default function DetalleBlog() {
  const { id } = useParams();
  const post = articulosBlog[id];

  if (!post) {
    return (
      <main className="section container">
        <p>Artículo no encontrado.</p>
        <Link to="/blogs" className="btn btn--dark">Volver a Blogs</Link>
      </main>
    );
  }

  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <p className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/blogs">Blogs</Link> / {post.tag}
          </p>

          <div className="post-hero">
            <img
              src={post.imagen}
              alt={post.alt}
              width="760"
              height="320"
              onError={manejarErrorImagen}
            />
          </div>

          <span className="tag">{post.tag}</span>
          <h1>{post.titulo}</h1>
          <div className="post-meta">
            <span>{post.lectura}</span>
            <span>{post.categoria}</span>
          </div>

          <div className="post-body">
            {post.parrafos.map((texto, idx) => (
              <p key={idx}>{texto}</p>
            ))}
          </div>

          <Link to="/blogs" className="btn btn--dark mt-3">
            ← Volver a Blogs
          </Link>
        </div>
      </section>
    </main>
  );
}