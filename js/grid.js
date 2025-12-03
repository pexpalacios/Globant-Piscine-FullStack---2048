import { matrix } from './script.js';

let newTile = null;
let popupwin = document.getElementById("popupwin");
let popuplose = document.getElementById("popuplose");
const score = document.getElementById("score");
const overlay = document.getElementById("overlay");

const buttons = document.querySelectorAll(".bttn");
buttons.forEach(boton => {
    boton.addEventListener("click", restartGrid);
});


export function createGrid() 
{
	const grid = document.querySelector('.grid-container');
	grid.innerHTML = "";

	for (let i = 0; i < 16; i++) 
	{
		const cell = document.createElement('div');
		cell.classList.add('cell');
		grid.appendChild(cell);
	}

	addRandomTile();
    addRandomTile();
	updateGrid();
}

export function addRandomTile() 
{
	let empty = [];

	for (let r = 0; r < 4; r++) 
	{
		for (let c = 0; c < 4; c++) 
		{
			if (matrix[r][c] === 0)
				empty.push([r, c]);
		}
	}

	if (empty.length === 0) 
		return;
	const [row, col] = empty[Math.floor(Math.random() * empty.length)];
	if (Math.random() < 0.9)
		matrix[row][col] = 2;
	else
		matrix[row][col] = 4;
	newTile = { r: row, c: col };
	updateGrid();
}

export function updateGrid() 
{
    const cells = document.querySelectorAll('.grid-container .cell');
    let index = 0;

    for (let r = 0; r < 4; r++) 
	{
        for (let c = 0; c < 4; c++) 
		{
            const value = matrix[r][c];
            const cell = cells[index];

			if (value === 0)
				cell.textContent = "";
			else
				cell.textContent = value;
            cell.className = "cell";
            cell.classList.add(`tile-${value}`);

			if (newTile && newTile.r === r && newTile.c === c) 
			{
                cell.classList.add("new-tile");
                setTimeout(() => { newTile = null }, 0);
            }

			checkStatus(value);
            index++;
        }
    }
}

export function restartGrid()
{
	popupwin.classList.remove('open-popup');
	popuplose.classList.remove('open-popup');
	overlay.classList.remove('open-popup');
	document.body.style.overflow = '';

	for (let c = 0; c < 4; c++)
		for (let r = 0; r < 4; r++)
				matrix[r][c] = 0;
	score.textContent = 0;
	addRandomTile();
	addRandomTile();
	updateGrid();
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
			for (let c = 0; c < 4; c++)
			{
				if (r < 3 && matrix[r][c] === matrix[r + 1][c])
					return;
			}
		}
	}
	popuplose.classList.add('open-popup');
	overlay.classList.add('open-popup');
	document.body.style.overflow = 'hidden';
}