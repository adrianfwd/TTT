let tablero;
const jugadorUno = "O";
const cpu = "X";
let scoreJug = 0;
let scoreCpu = 0;
let empate = 0;
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
//tengo que crear un objeto para guardar los datos de scores y guardarlo en local y actualizarlo cada ves que se haga una de las funciones de ganar y etc
const celdas = document.querySelectorAll(".celdas");
empezarLaVara();

function empezarLaVara() {

    tablero = [];
    for (var i = 0; i < 9; i++) {
        tablero[i] = i;
    }


    for (var j = 0; j < celdas.length; j++) {
        celdas[j].innerText = "";
        celdas[j].style.backgroundColor = "";
        celdas[j].addEventListener("click", turnoClick);
    }
}

function turnoClick(cuadro) {
    if (typeof tablero[cuadro.target.id] == "number") {
        turno(cuadro.target.id, jugadorUno);
        if (!revisarEmpate() && !checkWin(tablero, jugadorUno)) turno(mejorCuadro(), cpu);
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
            if (jugadas.indexOf(linea[j]) === -1) {
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
        var index = indices[i];
        document.getElementById(index).style.backgroundColor = color;
    }

    if (victoria.jugador == jugadorUno) {
        scoreJug++;
        console.log("Jugador: " + scoreJug);
    } else {
        scoreCpu++;
        console.log("CPU: " + scoreCpu);
    }

    for (var i = 0; i < celdas.length; i++) {
        celdas[i].removeEventListener('click', turnoClick);
    }

    // Mostrar el resultado esto es solo para debuggear tengo que hacer una ventana que imprima estos datos jeje
    declararGanador(victoria.jugador == jugadorUno ? "ganaste" : "te verguearon que pato");
}

function declararGanador(mensaje) {
    document.querySelector(".ventana").style.display = "block";
    document.querySelector(".ventana .text").innerText = mensaje;
}

function espacioVacio() {
    var espacios = [];
    for (var i = 0; i < tablero.length; i++) {
        if (typeof tablero[i] == "number") {
            espacios.push(tablero[i]);
            //necesito verificar cuantos numeros hay en la tabla para que el random pueda funcionar bien acordarse de crear la variable que vaya junto a los numeros en el tablero

        }
    }
    console.log(espacios.length);//estoy debugueando los espacios preguntarle a nicol porque agrega un espacio de mas(prioridad)
    return espacios;
}

function mejorCuadro() {
    var vacios = espacioVacio();
    return vacios[0];
    // cambiar este metodo a un random o minimax si sobra tiempo
}

function revisarEmpate() {
    if (espacioVacio().length == 0) {
        for (var i = 0; i < celdas.length; i++) {
            celdas[i].style.backgroundColor = "green";
            celdas[i].removeEventListener("click", turnoClick);
        }
        declararGanador("Empate");
        empate++
        console.log("empate: " + empate);
        return true;
        
    }
    return false;
}