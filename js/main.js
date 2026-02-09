var partidoIniciado = false;
var equipoLocal = [
  "Jugador Local 1",
  "Jugador Local 2",
  "Jugador Local 3",
  "Jugador Local 4",
  "Jugador Local 5",
];
var equipoVisitante = [
  "Jugador Visitante 1",
  "Jugador Visitante 2",
  "Jugador Visitante 3",
  "Jugador Visitante 4",
  "Jugador Visitante 5",
];
var puntosLocal = 0;
var puntosVisitante = 0;

function iniciarPartido() {
  partidoIniciado = true;
  console.log("Partido iniciado.");
}

function finalizarPartido() {
  partidoIniciado = false;
  console.log(
    "Partido finalizado. Puntaje final: Local " +
      puntosLocal +
      " - Visitante " +
      puntosVisitante,
  );
}

function verEquipos(local, visitante) {
  alert(
    "Equipo local:\n" +
      local.join(", ") +
      "\n\n\nEquipo visitante:\n" +
      visitante.join(", "),
  );
  console.log("Mostrar equipos.");
}

function sumarPuntoLocal(puntosLocal) {
  puntosLocal++;
  console.log("Punto para el equipo local");
  return puntosLocal;
}

function sumarPuntoVisitante(puntosVisitante) {
  puntosVisitante++;
  console.log("Punto para el equipo visitante");
  return puntosVisitante;
}

let salir = false;

while (!salir) {
  let opcion;
  do {
    opcion = Number(
      prompt(
        "Bienvenido al simulador de scoreboard de básquet.\nSeleccione una opción:\n[1] Iniciar partido\n[2] Ver equipos\n[3] Salir\n",
      ),
    );
  } while (opcion !== 1 && opcion !== 2 && opcion !== 3);

  if (opcion === 1) {
    iniciarPartido();
    salir = true;
  } else if (opcion === 2) {
    verEquipos(equipoLocal, equipoVisitante);
  } else if (opcion === 3) {
    salir = true;
  }
}

while (partidoIniciado) {
  let opcionPartido;
  do {
    opcionPartido = Number(
      prompt(
        "Local " +
          puntosLocal +
          " - " +
          puntosVisitante +
          " Visitante\n\n[1] Sumar punto local\n[2] Sumar punto visitante\n[3]Finalizar partido",
      ),
    );
  } while (opcionPartido !== 1 && opcionPartido !== 2 && opcionPartido !== 3);
  if (opcionPartido === 1) {
    puntosLocal = sumarPuntoLocal(puntosLocal);
    partidoIniciado = true;
  } else if (opcionPartido === 2) {
    puntosVisitante = sumarPuntoVisitante(puntosVisitante);
    partidoIniciado = true;
  } else if (opcionPartido === 3) {
    finalizarPartido();
  }
}
