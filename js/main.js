let partido = {
  iniciado: false,
  puntosLocal: 0,
  puntosVisitante: 0,
  equipoLocal: null,
  equipoVisitante: null
};

let listaEquipos = [];

const puntosLocalSpan = document.getElementById("puntosLocal");
const puntosVisitanteSpan = document.getElementById("puntosVisitante");
const nombreLocalH2 = document.getElementById("nombreLocal");
const nombreVisitanteH2 = document.getElementById("nombreVisitante");
const imgLocal = document.getElementById("imgLocal");
const imgVisitante = document.getElementById("imgVisitante");
const estadoP = document.getElementById("estado");
const listaLocalUl = document.getElementById("listaLocal");
const listaVisitanteUl = document.getElementById("listaVisitante");

const selectLocal = document.getElementById("selectLocal");
const selectVisitante = document.getElementById("selectVisitante");

const btnIniciar = document.getElementById("btnIniciar");
const btnFinalizar = document.getElementById("btnFinalizar");
const btnAleatorio = document.getElementById("btnAleatorio");
const botonesPuntos = document.querySelectorAll(".btnPunto");

async function cargarEquipos() {
  try {
    const respuesta = await fetch('teams.json');
    listaEquipos = await respuesta.json();
    poblarSelects();
    cargarPartido();
  } catch (error) {
    Swal.fire("Error", "Hubo un problema al cargar los datos de la NBA", "error");
  }
}

function poblarSelects() {
  listaEquipos.forEach(equipo => {
    selectLocal.add(new Option(equipo.nombre, equipo.id));
    selectVisitante.add(new Option(equipo.nombre, equipo.id));
  });
  selectVisitante.selectedIndex = 1;
}

function renderizarListas(equipo, contenedor) {
  contenedor.innerHTML = "";
  if (!equipo) return;
  equipo.jugadores.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;
    contenedor.appendChild(li);
  });
}

function guardarPartido() {
  localStorage.setItem("partido", JSON.stringify(partido));
}

function cargarPartido() {
  const datosGuardados = localStorage.getItem("partido");
  if (datosGuardados) {
    partido = JSON.parse(datosGuardados);
    actualizarMarcador();
    
    if (partido.equipoLocal) selectLocal.value = partido.equipoLocal.id;
    if (partido.equipoVisitante) selectVisitante.value = partido.equipoVisitante.id;

    estadoP.textContent = partido.iniciado
      ? "Partido en curso"
      : "Partido finalizado";
  }
}

function actualizarMarcador() {
  puntosLocalSpan.textContent = partido.puntosLocal;
  puntosVisitanteSpan.textContent = partido.puntosVisitante;
  nombreLocalH2.textContent = partido.equipoLocal?.nombre || "Equipo Local";
  nombreVisitanteH2.textContent = partido.equipoVisitante?.nombre || "Equipo Visitante";
  imgLocal.src = partido.equipoLocal?.escudo || "assets/placeholder.png";
  imgVisitante.src = partido.equipoVisitante?.escudo || "assets/placeholder.png";
  
  renderizarListas(partido.equipoLocal, listaLocalUl);
  renderizarListas(partido.equipoVisitante, listaVisitanteUl);
}

btnIniciar.addEventListener("click", () => {
  const idLocal = parseInt(selectLocal.value);
  const idVisitante = parseInt(selectVisitante.value);

  if (idLocal === idVisitante) {
    return Swal.fire("Selección inválida", "Un equipo no puede jugar contra sí mismo", "warning");
  }

  partido.equipoLocal = listaEquipos.find(e => e.id === idLocal);
  partido.equipoVisitante = listaEquipos.find(e => e.id === idVisitante);
  partido.puntosLocal = 0;
  partido.puntosVisitante = 0;
  partido.iniciado = true;
  estadoP.textContent = "Partido en curso";
  actualizarMarcador();
  guardarPartido();
});

botonesPuntos.forEach(boton => {
  boton.addEventListener("click", () => {
    if (!partido.iniciado) {
      return Swal.fire("Atención", "Primero debes iniciar el partido", "info");
    }
    const equipo = boton.dataset.equipo;
    const valor = parseInt(boton.dataset.valor);

    if (equipo === "local") partido.puntosLocal += valor;
    else partido.puntosVisitante += valor;

    actualizarMarcador();
    guardarPartido();
  });
});

btnAleatorio.addEventListener("click", () => {
  const ids = listaEquipos.map(e => e.id);
  const local = ids.splice(Math.floor(Math.random() * ids.length), 1)[0];
  const visitante = ids[Math.floor(Math.random() * ids.length)];
  
  selectLocal.value = local;
  selectVisitante.value = visitante;
});

btnFinalizar.addEventListener("click", () => {
  if (!partido.iniciado) {
    return Swal.fire("Aviso", "No hay un partido en curso para finalizar", "warning");
  }

  partido.iniciado = false;
  estadoP.textContent = "Partido finalizado";
  guardarPartido();
  const ganador = partido.puntosLocal > partido.puntosVisitante ? partido.equipoLocal.nombre : 
                  partido.puntosVisitante > partido.puntosLocal ? partido.equipoVisitante.nombre : "Empate";
  Swal.fire("Final del partido", `Resultado: ${partido.puntosLocal} - ${partido.puntosVisitante}. Ganador: ${ganador}`, "info");
});

cargarEquipos();