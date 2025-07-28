// Cargar usuarios desde localStorage o usar los de ejemplo
/*let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
  {
    id: 1,
    nombre: "Juan",
    edad: 25,
    email: "juan@mail.com",
    nombre_Emprendimiento: "J.L Estudio",
    rubro: "Tecnología",
  },
  {
    id: 2,
    nombre: "Ana",
    edad: 30,
    email: "ana@mail.com",
    nombre_Emprendimiento: "A.P. Pyme",
    rubro: "Comercio",
  },
];
*/
// Usuarios base por defecto
// Menú hamburguesa
document.getElementById("menuToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  nav.classList.toggle("open");
});

const usuariosBase = [
  {
    id: 1,
    nombre: "Juan",
    edad: 25,
    email: "juan@mail.com",
    nombre_Emprendimiento: "J.L Estudio",
    rubro: "Tecnología",
  },
  {
    id: 2,
    nombre: "Ana",
    edad: 30,
    email: "ana@mail.com",
    nombre_Emprendimiento: "A.P. Pyme",
    rubro: "Comercio",
  },
];
// Cargar usuarios agregados desde localStorage
const guardados = JSON.parse(localStorage.getItem("usuariosAgregados")) || [];

// Fusionar usuarios base y agregados
let usuarios = [...usuariosBase, ...guardados];

// Mostrar saludo personalizado si hay dato en localStorage
const saludoInicial = localStorage.getItem("eventoFavorito");
if (saludoInicial) {
  document.getElementById("saludo").innerText = `🎉 ¡Bienvenid@ al M.E.E.!
   Tu día confirmado de asistencia es para el ${saludoInicial}.`;
} else {
  document.getElementById("saludo").innerText = `🎉 ¡Bienvenid@ al M.E.E.!
   Por favor, seleccioná un día para confirmar tu asistencia.`;
}
mostrarUsuarios();

// Guardar evento favorito en localStorage
function guardarEventoFavorito() {
  const diaSeleccionado = document.getElementById("diaEvento").value;
  if (diaSeleccionado) {
    localStorage.setItem("eventoFavorito", diaSeleccionado);
    alert(
      `¡Gracias! Registraste tu asistencia para el día: ${diaSeleccionado}`
    );
    console.log(`Evento favorito guardado: ${diaSeleccionado} en localStorage`);
    document.getElementById("diaEvento").value = "";
    document.getElementById(
      "saludo"
    ).innerText = `🎉 ¡Bienvenid@ al M.E.E! Tu día confirmado de asistencia es para el ${diaSeleccionado}.`;
  } else {
    alert("Por favor seleccioná un día del evento.");
  }
}

// Mostrar usuarios en la lista
function mostrarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";
  usuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.innerText = `${usuario.nombre} _ Emprendimiento: ${usuario.nombre_Emprendimiento}. _Rubro: ${usuario.rubro}.`;
    lista.appendChild(li); //así lo agregamos a la lista visual de la página
  });
}

// Validar y obtener rubro de emprendimiento seleccionado
function validarRubro() {
  const rubro = document.getElementById("rubro").value;
  if (rubro === "ninguno") {
    alert("Por favor, seleccioná un rubro de emprendimiento.");
  }
  return;
}

// Agregar nuevo usuario desde lo que el usuario ingrese en el formulario
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value.trim());
  const email = document.getElementById("email").value.trim();
  const nombre_Emprendimiento = document
    .getElementById("nombre_Emprendimiento")
    .value.trim();
  const rubro =
    document.querySelector("input[name='rubro']:checked")?.value ||
    validarRubro();

  // Validaciones
  if (nombre === "") {
    alert("El nombre no puede estar vacío.");
    return;
  }

  if (nombre.length < 3) {
    alert("El nombre debe tener al menos 3 letras.");
    return;
  }

  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!regexNombre.test(nombre)) {
    alert("El nombre no debe contener números ni caracteres especiales.");
    return;
  }

  if (isNaN(edad) || edad < 18) {
    alert("Por favor ingresá una edad válida mayor a 18.");
    return;
  }

  if (!email.includes("@")) {
    alert("El email debe contener un '@'.");
    return;
  }

  // Calcular el nuevo ID de forma dinámica. Corrección sugerida en el feedback.
  const nuevoId = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;

  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    edad,
    email,
    nombre_Emprendimiento,
    rubro,
  };
  // Al agregar un nuevo usuario,
  usuarios.push(nuevoUsuario);
  //guarda solo los usuarios agregados:
  localStorage.setItem(
    "usuariosAgregados",
    JSON.stringify(usuarios.slice(usuariosBase.length))
  );

  /*// Guardar usuarios en localStorage
  localStorage.setItem("usuarios", JSON.stringify(usuarios));*/

  mostrarUsuarios();

  // Limpiar form
  document.getElementById("formulario").reset();
});
