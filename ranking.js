let peliculas = [];

let nombreUsuario = prompt('Hola! Por favor ingresa tu nombre:');

console.log(`Hola ${nombreUsuario}! Vamos a hacer un ranking de 5 películas para descubrir cual es te favorita entre ellas.`)

let rankingAnterior = sessionStorage.getItem("ultimoRanking");
if (rankingAnterior) {
  let ranking = JSON.parse(rankingAnterior);
  let ultimoRanking = "📊 Último ranking guardado:\n";
  for (const p of ranking) {
    ultimoRanking += `${p.nombre}: ${p.puntaje} puntos\n`;
  }
  console.log(ultimoRanking);
}

for (let x = 0; x < 5; x++ ){
let nombrePeli = prompt(`Ingresa el nombre de una película (${x + 1}/5):`);

while (nombrePeli == " " || nombrePeli == ""){
    console.log("Opción inválida. Ingresá un nombre.");
    nombrePeli = prompt(`Ingresá el nombre de la película ${x + 1}:`);

}
 peliculas.push({nombre: nombrePeli, puntaje: 0});

}

function elegirPelicula(peli1, peli2){
    let opcion = prompt (`¿Cuál te gusta mas? \n1: ${peli1.nombre} \n2: ${peli2.nombre}`);

    if (opcion === "1"){
        peli1.puntaje++;
    }else if (opcion ==="2"){
        peli2.puntaje++;
    }else{
        console.log(`Por favor ingresa una de las dos opciones disponibles.`);
        elegirPelicula(peli1, peli2);
    }
}

// Busco las combinaciones posibles para que se vote entre todas las peliculas.
let combinaciones = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4]
];

for (let [x, y] of combinaciones) {
  elegirPelicula(peliculas[x], peliculas[y]);
};


function compararPuntaje(){
    for (let x = 0; x < peliculas.length - 1; x++) {
        for (let y = x + 1; y < peliculas.length; y++) {
            if(peliculas[x].puntaje === peliculas[y].puntaje){
                console.log(`Hay un empate entre ${peliculas[x].nombre} y ${peliculas[y].nombre}, por favor volvé a votar:`);
                elegirPelicula(peliculas[x], peliculas[y]);
            }
        }
    }
};

compararPuntaje();

peliculas.sort((a, b) => b.puntaje - a.puntaje); 

console.log(`🎥 Tu película favorita es: ${peliculas[0].nombre}`);
let rankingCompleto = "🎬 Tu ranking completo es:\n";
for (let x = 0; x < peliculas.length; x++) {
  rankingCompleto += `${x + 1}: ${peliculas[x].nombre}, con ${peliculas[x].puntaje} puntos\n`;
}
console.log(rankingCompleto);

sessionStorage.setItem("ultimoRanking", JSON.stringify(peliculas));


