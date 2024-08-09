let tablero;
const jugadorUno = "O";
const cpu = "X";
let scores = {
    scoreCpu: 0,
    scoreJug: 0,
    empate: 0
};
const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
const celdas = document.querySelectorAll(".celdas");
empezarLaVara();

function empezarLaVara() {
    tablero = [];
    for (let i = 0; i < 9; i++) {
        tablero[i] = i;
    }

    for (let j = 0; j < celdas.length; j++) {
        celdas[j].innerText = "";
        celdas[j].style.backgroundColor = "";
        celdas[j].addEventListener("click", turnoClick);
    }

    document.querySelector(".ventana .text").innerText = "";

    document.querySelector(".ventana").style.display = "none";
    document.querySelector(".tablilla").style.display = "block";
}

function turnoClick(cuadro) {
    if (typeof tablero[cuadro.target.id] == "number") {
        turno(cuadro.target.id, jugadorUno);
        if (!revisarEmpate() && !checkWin(tablero, jugadorUno)) {
            setTimeout(function () {
                turno(mejorCuadro(), cpu);
            }, 500);
        }
    }
}

function turno(cuadroId, jugador) {
    tablero[cuadroId] = jugador;
    document.getElementById(cuadroId).innerText = jugador;
    var victoria = checkWin(tablero, jugador);
    if (victoria) derrota(victoria);
}

function checkWin(tablero, jugador) {
    var jugadas = [];
    for (var i = 0; i < tablero.length; i++) {
        if (tablero[i] === jugador) {
            jugadas.push(i);
        }
    }

    for (var i = 0; i < lineas.length; i++) {
        var linea = lineas[i];
        var esGanador = true;
        for (var j = 0; j < linea.length; j++) {
            var encontrado = false;
            for (var k = 0; k < jugadas.length; k++) {
                if (jugadas[k] === linea[j]) {
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                esGanador = false;
                break;
            }
        }
        if (esGanador) {
            return { index: i, jugador: jugador };
        }
    }
    return null;
}

function derrota(victoria) {
    var indices = lineas[victoria.index];
    var color;
    if (victoria.jugador == jugadorUno) {
        color = "blue";
    } else {
        color = "red";
    }

    for (var i = 0; i < indices.length; i++) {
        document.getElementById(indices[i]).style.backgroundColor = color;
    }

    if (victoria.jugador == jugadorUno) {
        scores.scoreJug++;
        document.querySelector(".tablilla").style.display = "none";
        console.log("Jugador: " + scores.scoreJug);
    } else {
        scores.scoreCpu++;
        document.querySelector(".tablilla").style.display = "none";
        console.log("CPU: " + scores.scoreCpu);
    }

    for (var i = 0; i < celdas.length; i++) {
        celdas[i].removeEventListener('click', turnoClick);
    }

    guardarScore();
    declararGanador(victoria.jugador == jugadorUno ? "victorias "+scores.scoreJug : "perdiste "+scores.scoreCpu);
}

function declararGanador(mensaje) {
    document.querySelector(".ventana").style.display = "grid";
    document.querySelector(".ventana .text").innerText = mensaje;
    

}

function espacioVacio() {
    var espacios = [];
    for (var i = 0; i < tablero.length; i++) {
        if (typeof tablero[i] == "number") {
            espacios.push(tablero[i]);
        }
    }
    return espacios;
}

function mejorCuadro() {
    var vacios = espacioVacio();
    return vacios[getRandomInt(vacios.length)];
}

function revisarEmpate() {
    if (espacioVacio().length == 0) {
        for (var i = 0; i < celdas.length; i++) {
            celdas[i].style.backgroundColor = "green";
            celdas[i].removeEventListener("click", turnoClick);
        }
        declararGanador("¡Empate!");
        scores.empate++;
        document.querySelector(".tablilla").style.display = "none";
        guardarScore();
        return true;
    }
    return false;
}

function guardarScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function obtenerScore() {
    const scoresString = localStorage.getItem('scores');
    return scoresString ? JSON.parse(scoresString) : null;
}