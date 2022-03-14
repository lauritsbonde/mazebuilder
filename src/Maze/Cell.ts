interface walls {
	top: boolean;
	right: boolean;
	bottom: boolean;
	left: boolean;
}

class Cell {
	walls: walls;
	visited: boolean;
	tried: walls;

	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.walls = {
			top: true,
			right: true,
			bottom: true,
			left: true,
		};

		this.tried = {
			top: false,
			right: false,
			bottom: false,
			left: false,
		};

		this.visited = false;

		this.x = x;
		this.y = y;
	}

	reset() {
		this.walls = {
			top: true,
			right: true,
			bottom: true,
			left: true,
		};

		this.tried = {
			top: false,
			right: false,
			bottom: false,
			left: false,
		};

		this.visited = false;
	}
}

export default Cell;
