/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   METÁLICA ZAMBRANO — Archivo Central de Contenido          ║
 * ║   content.js                                                  ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  CÓMO EDITAR:                                                ║
 * ║  1. Abre este archivo con el Bloc de notas.                  ║
 * ║  2. Cambia SOLO el texto entre comillas " ".                 ║
 * ║  3. Guarda (Ctrl+S) y recarga el navegador (F5).             ║
 * ║  ⚠ No borres comas, comillas ni llaves {}[]                  ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const CONTENT = {

  /* ────────────────────────────────────────────────
     SEO — Metadatos del sitio
  ──────────────────────────────────────────────── */
  seo: {
    titulo:      "Metálica Zambrano | Soldadura y Estructuras Metálicas — Ibarra, Ecuador",
    descripcion: "Taller de soldadura industrial y trabajos metálicos en Ibarra, Ecuador. Estructuras, portones, rejas y proyectos a medida. +20 años de experiencia. William Zambrano.",
    keywords:    "soldadura, estructuras metálicas, portones, rejas, Ibarra, Ecuador, William Zambrano"
  },

  /* ────────────────────────────────────────────────
     EMPRESA
  ──────────────────────────────────────────────── */
  empresa: {
    nombre:          "Metálica Zambrano",
    propietario:     "William Zambrano",
    cargo:           "Soldador Profesional",
    slogan:          "Soldadura y estructuras metálicas de precisión",
    aniosExperiencia: "+20",
    proyectos:       "500+",
    copyright:       "© 2026 Metálica Zambrano. Todos los derechos reservados."
  },

  /* ────────────────────────────────────────────────
     HERO — Sección principal (pantalla completa)
     heroTitulo: el texto grande se anima palabra
     por palabra. Usa "/" para forzar salto de línea.
  ──────────────────────────────────────────────── */
  hero: {
    // El "/" crea un salto de línea en el titular
    titulo:    "Construido / para durar.",
    subtitulo: "Soldadura y estructuras metálicas de precisión",
    credito:   "William Zambrano — Ibarra, Ecuador",
    ctaTexto:  "Cotizar por WhatsApp",
    ctaLink:   "https://wa.me/593988623528?text=Hola%20William%2C%20deseo%20una%20cotizaci%C3%B3n."
  },

  /* ────────────────────────────────────────────────
     DECLARACIÓN DE MARCA (sección sticky intermedia)
  ──────────────────────────────────────────────── */
  declaracion: {
    // Se anima palabra por palabra al hacer scroll
    frase: "Cada pieza, / soldada con / precisión.",
    detalle: "Más de dos décadas forjando estructuras que resisten el tiempo."
  },

  /* ────────────────────────────────────────────────
     SERVICIOS
     Para agregar uno: copia un bloque {} con coma.
  ──────────────────────────────────────────────── */
  servicios: [
    {
      numero:      "01",
      titulo:      "Estructuras Metálicas",
      descripcion: "Diseño, fabricación e instalación de estructuras de acero para viviendas, galpones y edificaciones comerciales de alta resistencia.",
      detalle:     "Cálculo estructural · Acero A36 · Galvanizado"
    },
    {
      numero:      "02",
      titulo:      "Portones y Rejas",
      descripcion: "Portones corredizos, batientes y rejas de seguridad a medida. Combinamos funcionalidad, seguridad y estética en cada proyecto.",
      detalle:     "Diseño personalizado · Acabado anticorrosión"
    },
    {
      numero:      "03",
      titulo:      "Soldadura Industrial",
      descripcion: "Soldadura MIG, TIG y electrodo revestido para proyectos industriales, maquinaria y uniones críticas que exigen máxima precisión.",
      detalle:     "MIG · TIG · Electrodo revestido · Certificado"
    },
    {
      numero:      "04",
      titulo:      "Mantenimiento y Reparación",
      descripcion: "Reparación y mantenimiento preventivo de estructuras metálicas y maquinaria para prolongar su vida útil y garantizar su seguridad.",
      detalle:     "Diagnóstico · Refuerzo estructural · Garantía"
    }
  ],

  /* ────────────────────────────────────────────────
     NOSOTROS
  ──────────────────────────────────────────────── */
  nosotros: {
    tagline:  "Sobre el taller",
    titulo:   "Dos décadas forjando confianza.",
    parrafos: [
      "Metálica Zambrano nació de la convicción de que un buen trabajo metálico no solo debe ser resistente: debe ser honesto. Cada unión, cada corte, cada soldadura lleva la firma de William Zambrano.",
      "Con más de 20 años en el oficio, hemos construido desde estructuras para galpones industriales hasta rejas artísticas para hogares. Nuestro taller en Ibarra trabaja con acero de primera calidad y técnicas certificadas.",
      "El compromiso es sencillo: entregamos en el plazo acordado, con la calidad prometida y sin sorpresas en el precio."
    ],
    stats: [
      { valor: "+20", label: "Años de experiencia" },
      { valor: "500+", label: "Proyectos entregados" },
      { valor: "100%", label: "Garantía en trabajos" }
    ]
  },

  /* ────────────────────────────────────────────────
     CONTACTO
     ⚠ Edita aquí los datos reales del negocio
  ──────────────────────────────────────────────── */
  contacto: {
    // Título animado — usa "/" para salto de línea
    tituloHero: "Hablemos de / tu proyecto.",
    subtitulo:  "Cuéntanos qué necesitas y te damos una cotización sin compromiso.",

    direccion:    "Barrio 16 de febrero, Calle Santa Isabel 18-40 entre Cuenca y Zumba",
    ciudad:       "Ibarra, Ecuador",
    email:        "williamzambrano@gmail.com",

    telefono1:    "+593 98 862 3528",
    telefono1Raw: "593988623528",
    telefono2:    "+593 95 976 5990",
    telefono2Raw: "593959765990",

    whatsappLink1: "https://wa.me/593988623528?text=Hola%20William%2C%20deseo%20una%20cotizaci%C3%B3n.",
    whatsappLink2: "https://wa.me/593959765990?text=Hola%20William%2C%20deseo%20una%20cotizaci%C3%B3n.",

    qrTexto: "Escanea para escribirnos directo por WhatsApp",

    // Google Maps embed — pega el src del iframe de Google Maps
    mapaEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d282.6031667779374!2d-78.12945670723525!3d0.36259401222300447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a3ca16762644b%3A0x9e0277583495eef9!2sIsla%20Sta.%20Isabel%201840%2C%20Ibarra%2C%20Ecuador!5e0!3m2!1ses-419!2sus!4v1788500671538!5m2!1ses-419!2sus"
  },

  /* ────────────────────────────────────────────────
     IMÁGENES (rutas relativas al sitio)
     Para cambiar una imagen: reemplaza el archivo
     en la carpeta assets/images/ y edita la ruta.
  ──────────────────────────────────────────────── */
  imagenes: {
    logo:    "assets/images/LogoWZ.png",
    hero:    "assets/images/soldador_princiapl_landing.jpg",
    qr:      "assets/images/QR_WhatsApp_MetalicaZambrano.png",
    favicon: "assets/images/LogoWZ.png",

    /* Galería de trabajos — agrega más rutas aquí.
       Las imágenes se muestran en la sección parallax. */
    galeria: [
      "assets/images/gallery/trabajo_1.jpg",
      "assets/images/gallery/trabajo_4.jpg",
      "assets/images/gallery/trabajo_7.jpg",
      "assets/images/gallery/trabajo_11.jpg",
      "assets/images/gallery/trabajo_14.jpg",
      "assets/images/gallery/trabajo_22.jpg",
      "assets/images/gallery/trabajo_36.jpg",
      "assets/images/gallery/trabajo_40.jpg",
      "assets/images/gallery/trabajo_41.jpg"
    ]
  },

  /* ────────────────────────────────────────────────
     MENÚ DE NAVEGACIÓN
  ──────────────────────────────────────────────── */
  menu: [
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros",  href: "#nosotros"  },
    { label: "Galería",   href: "#galeria"   },
    { label: "Contacto",  href: "#contacto"  }
  ]

};
