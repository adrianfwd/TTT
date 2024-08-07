var tablero;
const jugadorUno = "O"
const cpu = "X"
let scoreJug = 0;
let scoreCpu = 0;
const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
]

const celdas = document.querySelectorAll(".celdas");
startGame()

function startGame() {
    tablero = Array.from(Array(9).keys());
    //console.log(tablero);
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].innerText = "";
        celdas[i].style.removeProperty("background-color");
        celdas[i].addEventListener("click", turnoClick, false)
    }

}

function turnoClick(cuadro) {
    if (typeof tablero[cuadro.target.id] == "number") {
        turno(cuadro.target.id, jugadorUno)
        if (!revisarEmpate()) turno(mejorCuadro(), cpu)
    }
}

function turno(cuadroId, jugador) {
    tablero[cuadroId] = jugador;
    document.getElementById(cuadroId).innerText = jugador;
    let victoria = checkWin(tablero, jugador);
    if (victoria) derrota(victoria);

}


function checkWin(tablero, jugador) {
    // Encontrar las posiciones ocupadas por el jugador
    let jugadas = [];
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === jugador) {
            jugadas.push(i);
        }
    }

    // Verificar cada línea ganadora
    for (let i = 0; i < lineas.length; i++) {
        let linea = lineas[i];
        let esGanador = true;
        for (let j = 0; j < linea.length; j++) {
            if (!jugadas.includes(linea[j])) {
                esGanador = false;
                break;
            }
        }
        if (esGanador) {
            return { index: i, jugador: jugador };
        }
    }

    // Si no se encuentra una línea ganadora
    return null;
}
function derrota(victoria) {
   
    for (let index of lineas[victoria.index]) {
        document.getElementById(index).style.backgroundColor =
            victoria.jugador == jugadorUno ? "blue" : "red";

    }
    if ( jugadorUno == "blue") {
        scoreJug++
        console.log("jugador "+scoreJug);
    } else {
        scoreCpu++
        console.log("Cpu "+scoreCpu)
    }

    for (var i = 0; i < celdas.length; i++) {
        celdas[i].removeEventListener('Click', turnoClick, false);
    }
}



function declararGanador(el) {
    document.querySelector(".ventana").style.display = "block";
    document.querySelector(".ventana.text").innerText = jugador;
    alert(el);
}


function espacioVacio() {
    return tablero.filter(s => typeof s == "number")
}

function mejorCuadro() {
    return espacioVacio()[0]
}

function revisarEmpate() {
    if (espacioVacio().length == 0) {
        for (var i = 0; i < celdas.length; i++) {
            celdas[i].style.backgroundColor = "green"
            celdas[i].removeEventListener("click", turnoClick, false);
        }
        alert("empate")
        return true;
    }
    return false
}