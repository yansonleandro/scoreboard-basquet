let partido = {
  iniciado: false,
  puntosLocal: 0,
  puntosVisitante: 0,
};


const equipoLocal = [
  { nombre: "Jugador Local 1" },
  { nombre: "Jugador Local 2" },
  { nombre: "Jugador Local 3" },
  { nombre: "Jugador Local 4" },
  { nombre: "Jugador Local 5" },
];

const equipoVisitante = [
  { nombre: "Jugador Visitante 1" },
  { nombre: "Jugador Visitante 2" },
  { nombre: "Jugador Visitante 3" },
  { nombre: "Jugador Visitante 4" },
  { nombre: "Jugador Visitante 5" },
];


const puntosLocalSpan = document.getElementById("puntosLocal");
const puntosVisitanteSpan = document.getElementById("puntosVisitante");
const estadoP = document.getElementById("estado");

const btnIniciar = document.getElementById("btnIniciar");
const btnLocal = document.getElementById("btnLocal");
const btnVisitante = document.getElementById("btnVisitante");
const btnFinalizar = document.getElementById("btnFinalizar");
const btnReiniciar = document.getElementById("btnReiniciar");


function mostrarEquipos() {
  const listaLocal = document.getElementById("listaLocal");
  const listaVisitante = document.getElementById("listaVisitante");

  listaLocal.innerHTML = "";
  listaVisitante.innerHTML = "";

  equipoLocal
    .filter(jugador => jugador.nombre)
    .forEach(jugador => {
      const li = document.createElement("li");
      li.textContent = jugador.nombre;
      listaLocal.appendChild(li);
    });

  equipoVisitante
    .filter(jugador => jugador.nombre)
    .forEach(jugador => {
      const li = document.createElement("li");
      li.textContent = jugador.nombre;
      listaVisitante.appendChild(li);
    });
}


function guardarPartido() {
  localStorage.setItem("partido", JSON.stringify(partido));
}

function cargarPartido() {
  const data = localStorage.getItem("partido");
  if (data) {
    partido = JSON.parse(data);
    actualizarMarcador();
    estadoP.textContent = partido.iniciado
      ? "Partido en curso"
      : "Partido finalizado";
  }
}

function actualizarMarcador() {
  puntosLocalSpan.textContent = partido.puntosLocal;
  puntosVisitanteSpan.textContent = partido.puntosVisitante;
}


btnIniciar.addEventListener("click", () => {
  partido.iniciado = true;
  estadoP.textContent = "Partido iniciado";
  guardarPartido();
});

btnLocal.addEventListener("click", () => {
  if (partido.iniciado) {
    partido.puntosLocal++;
    actualizarMarcador();
    guardarPartido();
  }
});

btnVisitante.addEventListener("click", () => {
  if (partido.iniciado) {
    partido.puntosVisitante++;
    actualizarMarcador();
    guardarPartido();
  }
});

btnFinalizar.addEventListener("click", () => {
  partido.iniciado = false;
  estadoP.textContent = "Partido finalizado";
  guardarPartido();
});

btnReiniciar.addEventListener("click", () => {
  localStorage.clear();
  partido = { iniciado: false, puntosLocal: 0, puntosVisitante: 0 };
  actualizarMarcador();
  estadoP.textContent = "Partido reiniciado";
});


mostrarEquipos();
cargarPartido();