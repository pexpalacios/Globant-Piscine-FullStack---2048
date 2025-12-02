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
	newTile = { r: row, c: col };
	updateGrid();
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

function restartGrid()
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

function slide(row, onCombine) 
{
    row = row.filter(num => num !== 0);

    for (let i = 0; i < row.length - 1; i++) 
	{
        if (row[i] === row[i + 1]) 
		{
            row[i] *= 2;
            row[i + 1] = 0;
            if (onCombine) 
				onCombine(i);
			score.textContent = parseInt(score.textContent) + row[i];
        }
    }

    row = row.filter(num => num !== 0);
    while (row.length < 4)
        row.push(0);
    return row;
}

function spawnSparkles(r, c) 
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

///////////////////
// Move functions//
///////////////////

function moveUp() 
{
    for (let c = 0; c < 4; c++)
	{
        let col = [];
        for (let r = 0; r < 4; r++)
            col.push(matrix[r][c]);

        col = slide(col, (i) => {
            spawnSparkles(i, c);
        });

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

        col = slide(col.reverse(), (i) => {
            spawnSparkles(3 - i, c);
        }).reverse();

        for (let r = 0; r < 4; r++)
            matrix[r][c] = col[r];
    }
}


function moveLeft() {
    for (let r = 0; r < 4; r++) 
	{
        matrix[r] = slide(matrix[r], (i) => {
            spawnSparkles(r, i);
        });
    }
}


function moveRight() {
    for (let r = 0; r < 4; r++) 
	{
        matrix[r] = slide(matrix[r].slice().reverse(), (i) => {
            spawnSparkles(r, 3 - i);
        }).reverse();
    }
}



function checkStatus(value)
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

////////////////////
// --- OnLoad --- //
////////////////////

window.onload = () => 
{
	const score = document.getElementById("score");
	let popupwin = document.getElementById("popupwin");
	let popuplose = document.getElementById("popuplose");
	const overlay = document.getElementById("overlay");
	let newTile = null;

	createGrid();
	document.addEventListener("keydown", keyPress);
};