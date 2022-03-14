import React, { useState, useEffect } from 'react';
import Cell from '../../Maze/Cell';
import { move as nextMove, current } from '../../Maze/MazeBuilder';
import Row from './Row';

const Table = () => {
	const [size, setSize] = useState(4);
	const [startPos] = useState({ x: 0, y: 0 });
	const [mbPos, setMbPos] = useState<current>(startPos);
	const [won, setWon] = useState(false);
	const [auto, setAuto] = useState(false);
	const [speed, setSpeed] = useState(200);

	const buildGrid = (s: number = size) => {
		let g = [];
		for (let i = 0; i < s; i++) {
			let row = [];
			for (let j = 0; j < s; j++) {
				row.push(new Cell(j, i));
			}
			g.push(row);
		}
		g[startPos.y][startPos.x].visited = true;
		return g;
	};

	const [grid, setGrid] = useState<Array<Array<Cell>>>(buildGrid());
	const [path, setPath] = useState<Cell[]>([grid[mbPos.x][mbPos.y]]);

	const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSize(parseInt(e.target.value));
		setGrid(buildGrid(parseInt(e.target.value)));
		restart(parseInt(e.target.value));
	};

	const move = () => {
		if (won) return;
		const oldGrid = grid;
		const next = nextMove(mbPos, grid);
		const oldPath = path;

		if (next.x === -1 || next.y === -1) {
			backTrack();
			return;
		}

		// find direction
		const dir = {
			x: next.x - mbPos.x,
			y: next.y - mbPos.y,
		};

		// update grid
		if (dir.x === 1) {
			oldGrid[mbPos.y][mbPos.x].walls.right = false;
			oldGrid[mbPos.y][mbPos.x].tried.right = true;
			oldGrid[next.y][next.x].walls.left = false;
		} else if (dir.x === -1) {
			oldGrid[mbPos.y][mbPos.x].walls.left = false;
			oldGrid[mbPos.y][mbPos.x].tried.left = true;
			oldGrid[next.y][next.x].walls.right = false;
		} else if (dir.y === 1) {
			oldGrid[mbPos.y][mbPos.x].walls.bottom = false;
			oldGrid[mbPos.y][mbPos.x].tried.bottom = true;
			oldGrid[next.y][next.x].walls.top = false;
		} else if (dir.y === -1) {
			oldGrid[mbPos.y][mbPos.x].walls.top = false;
			oldGrid[mbPos.y][mbPos.x].tried.top = true;
			oldGrid[next.y][next.x].walls.bottom = false;
		}

		oldGrid[next.y][next.x].visited = true;

		// update path
		oldPath.push(oldGrid[next.y][next.x]);

		if (oldPath.length === size * size) {
			setWon(true);
		}

		setGrid([...oldGrid]);
		setMbPos({ x: next.x, y: next.y });
		setPath([...oldPath]);
	};

	useEffect(() => {
		let interval = setInterval(() => {
			if (auto) {
				move();
			}
		}, speed);
		return () => clearInterval(interval);
	}, [auto, speed, path, move]);

	const backTrack = () => {
		const oldGrid = grid;
		const oldPath = path;

		if (path.length === 0) {
			setAuto(false);
			return;
		}

		const last = path[path.length - 1];
		const prevLast = path[path.length - 2];

		// find direction
		const dir = {
			x: last.x - prevLast.x,
			y: last.y - prevLast.y,
		};

		// update grid
		last.reset();
		if (dir.x === 1) {
			oldGrid[prevLast.y][prevLast.x].walls.right = true;
		} else if (dir.x === -1) {
			oldGrid[prevLast.y][prevLast.x].walls.left = true;
		} else if (dir.y === 1) {
			oldGrid[prevLast.y][prevLast.x].walls.bottom = true;
		} else if (dir.y === -1) {
			oldGrid[prevLast.y][prevLast.x].walls.top = true;
		}

		setMbPos({ x: prevLast.x, y: prevLast.y });
		setPath([...oldPath.slice(0, oldPath.length - 1)]);
		setGrid([...oldGrid]);
	};

	const restart = (s: number = size) => {
		setWon(false);
		setMbPos(startPos);
		setPath([grid[startPos.y][startPos.x]]);
		setAuto(false);
		setGrid(buildGrid(s));
	};

	return (
		<div>
			<button onClick={() => move()} disabled={auto}>
				move
			</button>
			<button onClick={() => setAuto(!auto)}>{auto ? 'Stop auto' : 'Start auto'}</button>
			<p>
				Gridsize: <input type="range" min="2" max="30" value={size} onChange={(e) => handleSizeChange(e)} /> {size}
			</p>
			<p>
				Automove speed: <input type="range" min="5" max="1000" step="5" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
				{speed < 10 ? 'very fast' : speed < 100 ? 'fast' : speed < 250 ? 'medium' : 'slow'}
			</p>
			<table style={{ width: '95vw', height: '60vh', borderCollapse: 'collapse', marginLeft: '2.5vw' }}>
				<tbody>
					{grid.map((row, index) => (
						<Row key={index} row={row} mbPos={mbPos} gridSize={size} />
					))}
				</tbody>
			</table>
			{won && (
				<>
					<h1>Succes!🏆</h1>
					<button onClick={() => restart()}>restart</button>
				</>
			)}
		</div>
	);
};

export default Table;
