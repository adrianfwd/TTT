var tablero;
const jugadorUno = "O"
const cpu = "X"
const lineas = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
]

const celdas = document.querySelectorAll(".celdas");
startGame()

function startGame(){
    tablero  = Array.from(Array(9).keys());
    //console.log(tablero);
    for (var i = 0; i<celdas.length; i++){
        celdas[i].innerText ="";
        celdas[i].style.removeProperty("background-color");
        celdas[i].addEventListener("click",turnoClick, false)
    }
}

function turnoClick(cuadro){
    if(typeof tablero[cuadro.target.id] == "number"){
        turno (cuadro.target.id, jugadorUno)
        if (!revisarEmpate()) turno(mejorLugar(),cpu)
    }
}

function turno (cuadroId, jugador){
    tablero[cuadroId] = jugador;
    document.getElementById(cuadroId).innerText=jugador;
    let victoria = checkWin(tablero,jugador);
    if(victoria) derrota(victoria);

}

//--------------jugada de la cpu

function checkWin(tablero, jugador) {
	let jugadas = tablero.reduce((a, e, i) => 
		(e === jugador) ? a.concat(i) : a, []);
	let checkWin = null;
	for (let [index, win] of lineas.entries()) {
		if (win.every(elem => jugadas.indexOf(elem) > -1)) {
			checkWin = {index: index, jugador: jugador};
			break;
		}
	}
	return checkWin;
}

function derrota(victoria) {
	for (let index of lineas[victoria.index]) {
		document.getElementById(index).style.backgroundColor =
			victoria.jugador == jugadorUno  ? "blue" : "red";
	}
	for (var i = 0; i < celdas.length; i++) {
		celdas[i].removeEventListener('Click', turnoClick, false);
	}
}



function declararGanador(el) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = el;
}


function espacioVacio(){
    return tablero.filter(s => typeof s == "number")
}

function mejorCuadro(){
    return espacioVacio()[0]
}

function revisarEmpate(){
    if (espacioVacio().length == 0){
        for(var i = 0; i < celdas.length; i++){
            celdas[i].style.backgroundColor = "green"
            celdas[i].removeEventListener("click",turnoClick,false);
        }
        declararGanador("empate")
        return true;
    }
    return false
}