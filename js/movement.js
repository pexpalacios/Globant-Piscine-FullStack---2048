import { addRandomTile, updateGrid } from './grid.js';
import { matrix } from './script.js';

export function keyPress(e)
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