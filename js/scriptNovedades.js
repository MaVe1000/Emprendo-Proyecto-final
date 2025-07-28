// Menú hamburguesa
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("open");
});

document.getElementById("btnNoticias").addEventListener("click", () => {
  const categoria = document.getElementById("selectorNovedades").value;
  const contenedor = document.getElementById("noticiasContainer");
  const apiKey = "f8e7a0a979924edab0a1f2e25066c89b";

  // Mapeo de categorías en español → términos de búsqueda en inglés
  const keywordMap = {
    tecnologia: "tecnología, tech, innovación",
    negocios: "comercio, economía, finanzas",
    salud: "salud, medicina, bienestar",
    educacion: "educación, aprender, escuelas",
    turismo: "turismo, viajes, visitar, vacaciones",
    arte: "arte, cultura, museos, exhibiciones",
    deporte: "deportes, juegos, torneos",
  };
  /*const keywordMap = {
    tecnologia: 'technology, tech, innovation',
    negocios: 'business, economy, finance',
    salud: 'health, medicine, wellness',
    educacion: 'education, learning, schools',
    turismo: 'tourism, travel, visit, vacation',
    arte: 'art, culture, museums, exhibitions',
    deporte: 'sports, games, tournaments'
  };*/

  const keywords = keywordMap[categoria] || "noticias";

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    keywords
  )}&language=es&sortBy=publishedAt&pageSize=6&apiKey=${apiKey}`;

  fetch(url)
    .then((res) => res.json())
    .then((datos) => {
      contenedor.innerHTML = "";

      if (datos.articles && datos.articles.length > 0) {
        datos.articles.forEach((noticia) => {
          const div = document.createElement("div");
          div.classList.add("noticia");

          div.innerHTML = `
            <h3>${noticia.title}</h3>
            <p>${noticia.description || "No hay una descripción."}</p>
            <a href="${noticia.url}" target="_blank">Read more</a>
          `;
          contenedor.appendChild(div);
        });
      } else {
        contenedor.innerHTML =
          "<p>No se encontraron nuevas noticias en esta categoría.</p>";
      }
    })
    .catch((error) => {
      console.error("Error al consultar:", error);
      contenedor.innerHTML =
        "<p>Error al consultar la noticia. Por favor, intenta más tarde.</p>";
    });
});
/*Filtro para Mapeo de Empresas*/
function filtrarSectorEmpresas() {
  const sector = document.getElementById("filtroSector").value;
  const allCards = document.querySelectorAll(".tarjetas-empresas .card");

  allCards.forEach((card) => {
    if (sector === "todos" || card.classList.contains(sector)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
