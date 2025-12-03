import { keyPress } from './movement.js';
import { createGrid } from './grid.js';

export let matrix = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

document.addEventListener('DOMContentLoaded', () =>
{	
	let myVar;
	myVar = setTimeout(showPage, 1000);

	document.addEventListener("keydown", keyPress);
	createGrid();
});

function showPage()
{
	document.getElementById("loadingScreen").style.display = "none";
	document.getElementById("game").style.display = "";
}
