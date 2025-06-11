let peliculas = [];
let usuario = prompt('¡Hola! Por favor, ingresá tu nombre:').trim().toLowerCase();
document.getElementById("saludo").textContent = `¡Hola ${usuario}! Vamos a hacer un ranking de 5 películas.`;

// Mostrar ranking anterior guardado del usuario
let rankingAnteriorGuardado = localStorage.getItem(`ranking_${usuario}`);
if (rankingAnteriorGuardado) {
  let ranking = JSON.parse(rankingAnteriorGuardado);
  let html = "<h3>📊 Último ranking guardado:</h3><ul>";
  for (const peli of ranking) {
    html += `<li>${peli.nombre}: ${peli.puntaje} puntos</li>`;
  }
  html += "</ul>";
  document.getElementById("ranking-anterior").innerHTML = html;
}

// Ingreso de películas
const inputPelicula = document.getElementById("name-peli");
const botonAgregar = document.getElementById("btn-agregar");
const listaPeliculas = document.querySelectorAll("#lista-peliculas li");
let contadorPeliculas = 0;

botonAgregar.addEventListener("click", () => {
  if (inputPelicula.value.trim() !== "" && contadorPeliculas < 5) {
    const nombrePelicula = inputPelicula.value.trim();
    peliculas.push({ nombre: nombrePelicula, puntaje: 0 });
    listaPeliculas[contadorPeliculas].textContent = `Película ${contadorPeliculas + 1}: ${nombrePelicula}`;
    inputPelicula.value = "";
    contadorPeliculas++;

    if (contadorPeliculas === 5) {
      botonAgregar.disabled = true;
      inputPelicula.disabled = true;
      comenzarComparaciones();
    }
  } else {
    alert("Ingresá un nombre válido de película.");
  }
});

// Combinaciones posibles entre las películas (pares únicos)
let combinaciones = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 2], [1, 3], [1, 4],
  [2, 3], [2, 4],
  [3, 4]
];

let parActual = 0;
let tituloPeli1 = document.getElementById("titulo-peli-1");
let tituloPeli2 = document.getElementById("titulo-peli-2");
let botonElegir1 = document.getElementById("btn-elegir-1");
let botonElegir2 = document.getElementById("btn-elegir-2");

function comenzarComparaciones() {
  mostrarSiguientePar();
}

function mostrarSiguientePar() {
  if (parActual < combinaciones.length) {
    let [i, j] = combinaciones[parActual];
    tituloPeli1.textContent = peliculas[i].nombre;
    tituloPeli2.textContent = peliculas[j].nombre;

    botonElegir1.onclick = () => {
      peliculas[i].puntaje++;
      parActual++;
      mostrarSiguientePar();
    };

    botonElegir2.onclick = () => {
      peliculas[j].puntaje++;
      parActual++;
      mostrarSiguientePar();
    };
  } else {
    verificarEmpates();
  }
}

function verificarEmpates() {
  let hayEmpate = false;

  for (let i = 0; i < peliculas.length - 1; i++) {
    for (let j = i + 1; j < peliculas.length; j++) {
      if (peliculas[i].puntaje === peliculas[j].puntaje) {
        hayEmpate = true;
        tituloPeli1.textContent = peliculas[i].nombre + " (Desempate)";
        tituloPeli2.textContent = peliculas[j].nombre + " (Desempate)";
        botonElegir1.onclick = () => {
          peliculas[i].puntaje++;
          verificarEmpates();
        };
        botonElegir2.onclick = () => {
          peliculas[j].puntaje++;
          verificarEmpates();
        };
        return;
      }
    }
  }

  if (!hayEmpate) {
    mostrarRankingFinal();
  }
}

function mostrarRankingFinal() {
  peliculas.sort((a, b) => b.puntaje - a.puntaje);

  // Mostrar ranking nuevo
  let htmlNuevo = "<h3>🎬 Tu ranking final:</h3><ol>";
  for (let peli of peliculas) {
    htmlNuevo += `<li>${peli.nombre}: ${peli.puntaje} puntos</li>`;
  }
  htmlNuevo += "</ol>";
  document.getElementById("ranking-nuevo").innerHTML = htmlNuevo;

  // Guardar en localStorage por usuario
  localStorage.setItem(`ranking_${usuario}`, JSON.stringify(peliculas));

  // Ocultar comparación
  tituloPeli1.textContent = "";
  tituloPeli2.textContent = "";
  botonElegir1.style.display = "none";
  botonElegir2.style.display = "none";
}
