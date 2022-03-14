import React from 'react';
import MCell from '../../Maze/Cell';
import Cell from './Cell';
import { current } from '../../Maze/MazeBuilder';

interface Props {
	row: MCell[];
	mbPos: current;
	gridSize: number;
}

const Row: React.FC<Props> = ({ row, mbPos, gridSize }) => {
	const style = {
		width: '100%',
		height: 'calc(100% / ' + gridSize + ')',
	};

	return (
		<tr style={style}>
			{row.map((cell: MCell, index: number) => {
				return <Cell key={index} cell={cell} mbHere={cell.x === mbPos.x && cell.y === mbPos.y} gridSize={gridSize} />;
			})}
		</tr>
	);
};

export default Row;
