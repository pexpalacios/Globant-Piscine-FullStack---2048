/*
Methods to do:
- Check win and game over
- Restart game
- Color tiles

*/
/////////////////////////////////////
// --- Grid creation and utils --- //
/////////////////////////////////////

let matrix = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function createGrid() 
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

function addRandomTile() 
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
}

function updateGrid() 
{
    const cells = document.querySelectorAll('.grid-container .cell');
    let index = 0;

    for (let r = 0; r < 4; r++) 
	{
        for (let c = 0; c < 4; c++) 
		{
            const value = matrix[r][c];
            const cell = cells[index];

            // Update text
            cell.textContent = value === 0 ? "" : value;

            // Reset classes (keep the base "cell" class)
            cell.className = "cell";

            // Add value class, e.g. "tile-2", "tile-4", ...
            if (value !== 0) {
                cell.classList.add(`tile-${value}`);
            }
            index++;
        }
    }
}

function restartGrid()
{
	for (let c = 0; c < 4; c++)
		for (let r = 0; r < 4; r++)
				matrix[r][c] = 0;
	score.textContent = 0;
	addRandomTile();
	addRandomTile();
	updateGrid();
}

///////////////////////
// --- Movements --- //
///////////////////////

function keyPress(e)
{
	switch(e.key)
	{
		case "ArrowUp": moveUp();
		break;
		case "ArrowDown": moveDown();
		break;
		case "ArrowLeft": moveLeft();
		break;
		case "ArrowRight": moveRight();
		break;
		default:
			return;
	}
	addRandomTile();
	updateGrid();
}

function slide(row)
{
	row = row.filter(num => num !== 0);
	for(let i = 0; i < row.length - 1; i++)
	{
		if (row[i] === row[i + 1])
		{
			row[i] *= 2;
			row[i + 1] = 0;
			score.textContent = parseInt(score.textContent) + row[i];
		}
	}
	row = row.filter(num  => num !== 0);
	while (row.length < 4)
			row.push(0);
	return (row);
}

// Move functions//
function moveUp()
{
	for (let c = 0; c < 4; c++)
	{
		let col = [];
		for (let r = 0; r < 4; r++)
				col.push(matrix[r][c]);
		col = slide(col);
		for (let r = 0; r < 4; r++)
				matrix[r][c] = col[r];
	}
}

function moveDown()
{
	for (let c = 0; c < 4; c++)
	{
		let col = [];
		for (let r = 0; r < 4; r++)
				col.push(matrix[r][c]);
		col = slide(col.reverse()).reverse();
		for (let r = 0; r < 4; r++)
				matrix[r][c] = col[r];
	}
}

function moveLeft()
{
	for (let r = 0; r < 4; r++)
		matrix[r] = slide(matrix[r]);
}

function moveRight()
{
	for (let r = 0; r < 4; r++)
		matrix[r] = slide(matrix[r].slice().reverse()).reverse();
}


////////////////////
// --- OnLoad --- //
////////////////////

window.onload = () => 
{ 
	const score = document.getElementById("score");

	createGrid();
	document.addEventListener("keydown", keyPress);
};