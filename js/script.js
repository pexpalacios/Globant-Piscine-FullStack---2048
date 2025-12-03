import { keyPress } from './movement.js';
import { createGrid } from './grid.js';

export let matrix = [
    [2,4,8,16],
    [256,128,64,32],
    [512,1024,1024,0],
    [0,0,0,0]
];

setTimeout(() => {
    document.getElementById("game").classList.add("animate-in");
}, 1000);


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
