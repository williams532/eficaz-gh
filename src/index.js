export default {
  async fetch(request) {
    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EFICAZ G&H | Estilo, Calidad y Variedad</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f7f9f9;
      color: #17202a;
      line-height: 1.6;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(9, 30, 32, 0.96);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 7%;
      box-shadow: 0 4px 18px rgba(0,0,0,0.18);
    }

    .logo {
      font-size: 25px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    .logo span {
      color: #37d6c0;
    }

    nav {
      display: flex;
      gap: 25px;
    }

    nav a {
      color: white;
      text-decoration: none;
      font-size: 15px;
      transition: 0.3s;
    }
header nav,
header nav a {
  position: relative;
  z-index: 10001;
  pointer-events: auto;
  cursor: pointer;
}

    nav a:hover {
      color: #37d6c0;
    }

    .hero {
      min-height: 88vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 7%;
      color: white;
      background:
        linear-gradient(rgba(4, 27, 29, 0.76), rgba(4, 27, 29, 0.82)),
        linear-gradient(135deg, #0d3b3e, #176b68, #0d3b3e);
    }

    .hero-content {
      max-width: 900px;
    }

    .hero .tag {
      display: inline-block;
      background: rgba(55, 214, 192, 0.14);
      border: 1px solid #37d6c0;
      color: #79f2df;
      padding: 8px 17px;
      border-radius: 30px;
      margin-bottom: 22px;
      font-size: 14px;
    }

    .hero h1 {
      font-size: clamp(45px, 8vw, 90px);
      line-height: 1;
      margin-bottom: 22px;
      letter-spacing: -2px;
    }

    .hero h1 span {
      color: #37d6c0;
    }

    .hero p {
      max-width: 700px;
      margin: 0 auto 30px;
      font-size: 19px;
      color: #e8eeee;
    }

    .btn {
      display: inline-block;
      padding: 14px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: bold;
      transition: 0.3s;
      margin: 6px;
    }

    .btn-primary {
      background: #37d6c0;
      color: #062426;
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      background: #58ead5;
    }

    .btn-outline {
      border: 1px solid white;
      color: white;
    }

    .btn-outline:hover {
      background: white;
      color: #102f32;
    }

    section {
      padding: 85px 7%;
    }

    .section-title {
      text-align: center;
      margin-bottom: 45px;
    }

    .section-title small {
      color: #148c83;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .section-title h2 {
      font-size: 40px;
      margin-top: 8px;
    }

    .section-title p {
      max-width: 650px;
      margin: 12px auto 0;
      color: #667;
    }

    .products {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .product-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0,0,0,0.07);
      transition: 0.3s;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 18px 38px rgba(0,0,0,0.12);
    }

    .product-image {
      height: 230px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 75px;
      background: linear-gradient(135deg, #e6f7f5, #d1efeb);
    }

    .product-content {
      padding: 22px;
    }

    .product-content h3 {
      margin-bottom: 8px;
      font-size: 21px;
    }

    .product-content p {
      color: #667;
      font-size: 14px;
      min-height: 66px;
    }

    .price-row {
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
      color: #0d716b;
    }

    .buy {
      background: #102f32;
      color: white;
      text-decoration: none;
      padding: 9px 14px;
      border-radius: 7px;
      font-size: 14px;
    }

    .features {
      background: #0b2d30;
      color: white;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 25px;
    }

    .feature {
      padding: 30px;
      border: 1px solid rgba(255,255,255,0.11);
      border-radius: 14px;
      background: rgba(255,255,255,0.04);
    }

    .feature .icon {
      font-size: 35px;
      margin-bottom: 15px;
    }

    .feature h3 {
      margin-bottom: 10px;
      color: #59e4d0;
    }

    .about {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 55px;
      align-items: center;
    }

    .about-box {
      min-height: 380px;
      border-radius: 20px;
      background: linear-gradient(135deg, #102f32, #1f7773);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      padding: 30px;
    }

    .about-text h2 {
      font-size: 42px;
      margin-bottom: 18px;
    }

    .about-text p {
      color: #667;
      margin-bottom: 17px;
    }

    .cta {
      text-align: center;
      background: linear-gradient(135deg, #dffffa, #eefcf9);
      border-radius: 22px;
      margin: 50px 7%;
      padding: 65px 30px;
    }

    .cta h2 {
      font-size: 40px;
      margin-bottom: 12px;
    }

    .cta p {
      margin-bottom: 25px;
      color: #667;
    }

    footer {
      background: #061f21;
      color: #cbd6d6;
      padding: 55px 7% 25px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 40px;
    }

    footer h3 {
      color: white;
      margin-bottom: 15px;
    }

    footer a {
      color: #cbd6d6;
      text-decoration: none;
      display: block;
      margin-bottom: 8px;
    }

    footer a:hover {
      color: #37d6c0;
    }

    .copyright {
      border-top: 1px solid rgba(255,255,255,0.12);
      margin-top: 40px;
      padding-top: 20px;
      text-align: center;
      font-size: 14px;
    }

    @media (max-width: 900px) {
      nav {
        display: none;
      }

      .products {
        grid-template-columns: repeat(2, 1fr);
      }

      .features-grid,
      .about,
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 550px) {
      .products {
        grid-template-columns: 1fr;
      }

      .hero h1 {
        font-size: 50px;
      }

      section {
        padding: 65px 6%;
      }
    }
  </style>
</head>

<body>

<header>
  <div class="logo">EFICAZ <span>G&H</span></div>

  <nav>
    <a href="#inicio">Inicio</a>
    <a href="#productos">Productos</a>
    <a href="#nosotros">Nosotros</a>
    <a href="#beneficios">Beneficios</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>

<section class="hero" id="inicio">
  <div class="hero-content">
    <div class="tag">ESTILO • CALIDAD • VARIEDAD</div>

    <h1>
      Descubre tu estilo con
      <span>EFICAZ G&H</span>
    </h1>

    <p>
      Productos seleccionados para complementar tu estilo,
      tu hogar y tu vida. Calidad, diseño y variedad en un solo lugar.
    </p>

    <a class="btn btn-primary" href="#productos">Comprar ahora</a>
    <a class="btn btn-outline" href="#nosotros">Conócenos</a>
  </div>
</section>

<section id="productos">
  <div class="section-title">
    <small>Nuestra colección</small>
    <h2>Productos destacados</h2>
    <p>
      Explora una selección de productos pensados para diferentes estilos y necesidades.
    </p>
  </div>

  <div class="products">

    <div class="product-card">
      <div class="product-image">👕</div>
      <div class="product-content">
        <h3>Ropa y Moda</h3>
        <p>
          Diseños modernos para hombre, mujer y toda ocasión.
        </p>
        <div class="price-row">
          <span class="price">Desde $24.99</span>
          <a class="buy" href="ENLACE-DE-TU-PRODUCTO-SHOPIFY">Comprar</a>
        <div class="price-row">
    <span class="price">Desde $24.99</span>
    <a class="buy" href="#">Comprar</a>

      </div>
    </div>

    <div class="product-card">
      <div class="product-image">⌚</div>
      <div class="product-content">
        <h3>Accesorios</h3>
        <p>
          Complementos modernos para darle un toque especial a tu estilo.
        </p>
        <div class="price-row">
          <span class="price">Desde $19.99</span>
          <a class="buy" href="ENLACE-DE-TU-Shopify.
        </div>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">🌸</div>
      <div class="product-content">
        <h3>Perfumes</h3>
        <p>
          Aromas elegantes y productos seleccionados para destacar tu personalidad.
        </p>
        <div class="price-row">
          <span class="price">Desde $39.99</span>
          <a class="buy" href="#">Comprar</a>
        </div>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">🥤</div>
      <div class="product-content">
        <h3>Termos y Vasos</h3>
        <p>
          Productos prácticos y modernos para acompañarte todos los días.
        </p>
        <div class="price-row">
          <span class="price">Desde $18.99</span>
          <a class="buy" href="#">Comprar</a>
        </div>
      </div>
    </div>

  </div>
</section>

<section class="features" id="beneficios">
  <div class="section-title">
    <small style="color:#55dfcb">EFICAZ G&H</small>
    <h2>Compra con confianza</h2>
  </div>

  <div class="features-grid">

    <div class="feature">
      <div class="icon">🚚</div>
      <h3>Envío conveniente</h3>
      <p>
        Recibe tus productos de manera cómoda y segura.
      </p>
    </div>

    <div class="feature">
      <div class="icon">✓</div>
      <h3>Calidad seleccionada</h3>
      <p>
        Elegimos productos pensando en calidad, diseño y utilidad.
      </p>
    </div>

    <div class="feature">
      <div class="icon">🔒</div>
      <h3>Compra segura</h3>
      <p>
        Una experiencia diseñada para brindarte seguridad y confianza.
      </p>
    </div>

  </div>
</section>

<section id="nosotros">
  <div class="about">

    <div class="about-box">
      EFICAZ<br>G&H
    </div>

    <div class="about-text">
      <small style="color:#148c83;font-weight:bold;">SOBRE NOSOTROS</small>
      <h2>Variedad para tu estilo y tus necesidades</h2>

      <p>
        En EFICAZ G&H buscamos ofrecer una colección diversa de productos
        modernos, útiles y atractivos.
      </p>

      <p>
        Desde ropa y accesorios hasta perfumes, termos, artículos para el hogar
        y mucho más.
      </p>

      <a href="#productos" class="btn btn-primary">Explorar productos</a>
    </div>

  </div>
</section>

<div class="cta">
  <h2>Encuentra algo especial para ti</h2>
  <p>
    Descubre novedades, productos seleccionados y nuevas colecciones de EFICAZ G&H.
  </p>
  <a href="#productos" class="btn btn-primary">Ver colección</a>
</div>

<footer id="contacto">

  <div class="footer-grid">

    <div>
      <h3>EFICAZ G&H</h3>
      <p>
        Estilo, calidad y variedad en un solo lugar.
      </p>
    </div>

    <div>
      <h3>Enlaces</h3>
      <a href="#inicio">Inicio</a>
      <a href="#productos">Productos</a>
      <a href="#nosotros">Sobre nosotros</a>
    </div>

    <div>
      <h3>Ayuda</h3>
      <a href="#">Contacto</a>
      <a href="#">Envíos</a>
      <a href="#">Devoluciones</a>
      <a href="#">Privacidad</a>
    </div>

  </div>

  <div class="copyright">
    ©️ 2026 EFICAZ G&H. Todos los derechos reservados.
  </div>

</footer>

</body>
</html>
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  },
};
