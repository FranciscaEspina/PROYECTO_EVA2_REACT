export default function Nosotros() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>Nuestra historia</h1>
              <p>De un carrito de barrio a una tienda online — sin perder la esencia de la comida al paso.</p>
            </div>
          </div>

          <p>Al Toque nació de una idea simple: no todo el mundo tiene media hora para almorzar, pero eso no significa que deba comer mal. Empezamos como un carrito de completos en la esquina de un paradero, y con el tiempo sumamos churrascos, empanadas y papas rústicas hechas al momento.</p>
          <p>Hoy seguimos con la misma lógica: pedidos simples, tiempos cortos y sabor de verdad. Esta tienda online es nuestra forma de acercar ese mismo local de siempre a quien prefiere pedir desde el celular y pasar solo a retirar.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>El equipo detrás de esto</h2>
            </div>
          </div>

          <div className="team-grid">
            <div className="team-card">
              <img src="/img/meli.jpeg" alt="Foto Meli" />
              <p className="team-role">Melissa Vergara</p>
            </div>
            <div className="team-card">
              <img src="/img/Jean.PNG" alt="Foto Jean" />
              <p className="team-role">Jean Indey</p>
            </div>
            <div className="team-card">
              <img src="/img/panchi.PNG" alt="Foto Fran" />
              <p className="team-role">Francisca Espina</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}