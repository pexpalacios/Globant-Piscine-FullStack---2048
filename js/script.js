console.log('script.js loaded');
import { keyPress } from './movement.js';
import { createGrid } from './grid.js';


let matrix = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

//window.onload = () => 
document.addEventListener('DOMContentLoaded', () =>
	{
	let myVar;
	myVar = setTimeout(showPage, 400);
	const score = document.getElementById("score");
	let popupwin = document.getElementById("popupwin");
	let popuplose = document.getElementById("popuplose");
	const overlay = document.getElementById("overlay");
	let newTile = null;

	document.addEventListener("keydown", keyPress);
	createGrid();
});

function showPage()
{
	document.getElementById("loadingScreen").style.display = "none";
	document.getElementById("game").style.display = "";
}

export function spawnSparkles(r, c) 
{
    const grid = document.querySelector('.grid-container');
    const cell = grid.children[r * 4 + c];

    const rect = cell.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();

    const x = rect.left - gridRect.left + rect.width / 2;
    const y = rect.top  - gridRect.top  + rect.height / 2;

    const directions = [
        [-1, -1],
        [ 1, -1],
        [-1,  1],
        [ 1,  1]
    ];

    directions.forEach((d, index) => 
	{
        const star = document.createElement('i');
        star.className = "fa-solid fa-star sparkle-fa";  
        star.style.left = x + "px";
        star.style.top  = y + "px";
        star.style.setProperty("--dx", d[0]);
        star.style.setProperty("--dy", d[1]);
        star.style.animationDelay = (index * 40) + "ms";

        grid.appendChild(star);
        star.addEventListener("animationend", () => star.remove());
    });
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
