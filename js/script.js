// Menú hamburguesa
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("open");
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
