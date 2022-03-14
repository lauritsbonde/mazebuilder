import Cell from './Cell';

export interface current {
	x: number;
	y: number;
}

function findNeighbors(c: current, grid: Array<Array<Cell>>): Array<Cell> {
	let neighbors: Array<Cell> = [];

	// upper square
	if (c.y > 0 && !grid[c.y - 1][c.x].visited && !grid[c.y][c.x].tried.top) {
		neighbors.push(grid[c.y - 1][c.x]);
	}

	// right square
	if (c.x < grid.length - 1 && !grid[c.y][c.x + 1].visited && !grid[c.y][c.x].tried.right) {
		neighbors.push(grid[c.y][c.x + 1]);
	}

	// bottom square
	if (c.y < grid[0].length - 1 && !grid[c.y + 1][c.x].visited && !grid[c.y][c.x].tried.bottom) {
		neighbors.push(grid[c.y + 1][c.x]);
	}

	// left square
	if (c.x > 0 && !grid[c.y][c.x - 1].visited && !grid[c.y][c.x].tried.left) {
		neighbors.push(grid[c.y][c.x - 1]);
	}

	return neighbors;
}

function move(c: current, grid: Array<Array<Cell>>): Cell {
	let neighbors = findNeighbors(c, grid);

	if (neighbors.length === 0) return new Cell(-1, -1);

	let index = Math.round(Math.random() * (neighbors.length - 1));

	let nextCell = neighbors[index];

	//TODO: check if the selected cell will encapsulate another one

	return nextCell;
}

export { move };
