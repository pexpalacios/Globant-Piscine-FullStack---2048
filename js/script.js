import { keyPress } from './movement.js';
import { createGrid } from './grid.js';

export let matrix = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

//window.onload = () => 
document.addEventListener('DOMContentLoaded', () =>
	{
		
	let myVar;
	myVar = setTimeout(showPage, 1000);
	const score = document.getElementById("score");
	let popupwin = document.getElementById("popupwin");
	let popuplose = document.getElementById("popuplose");
	const overlay = document.getElementById("overlay");

	document.addEventListener("keydown", keyPress);
	createGrid();
});

function showPage()
{
	document.getElementById("loadingScreen").style.display = "none";
	document.getElementById("game").style.display = "";
}

export function checkStatus(value)
{
	if (value === 2048)
	{
		popupwin.classList.add('open-popup');
		overlay.classList.add('open-popup');
		document.body.style.overflow = 'hidden';
	}

	let full = true;
	for (let r = 0; r < 4; r++)
	{
		for (let c = 0; c < 4; c++)
		{
			if (matrix[r][c] === 0)
			{
				full = false;
				return;
			}

		}
	}

	if (full)
	{
		for (let r = 0; r < 4; r++)
		{
			for (let c = 0; c < 4; c++)
			{
				if(c < 3 && matrix[r][c] === matrix[r][c + 1])
					return;
			}
			if (r < 3 && matrix[r][0] === matrix[r + 1][0])
				return;
		}
	}
	popuplose.classList.add('open-popup');
	overlay.classList.add('open-popup');
	document.body.style.overflow = 'hidden';
}
