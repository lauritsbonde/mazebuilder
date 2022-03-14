import React from 'react';
import PropTypes from 'prop-types';
import MCell from '../../Maze/Cell';

interface Props {
	cell: MCell;
	mbHere: boolean;
	gridSize: number;
}

const Cell: React.FC<Props> = ({ cell, mbHere, gridSize }) => {
	const style = {
		borderTop: cell.walls.top ? '3px solid black' : 'none',
		borderRight: cell.walls.right ? '3px solid black' : 'none',
		borderBottom: cell.walls.bottom ? '3px solid black' : 'none',
		borderLeft: cell.walls.left ? '3px solid black' : 'none',
		backgroundColor: mbHere ? '#ff0000' : cell.visited ? '#00ff00' : '#ffffff',
		width: 'calc(100% / ' + gridSize + ')',
		height: 'calc(100% / ' + gridSize + ')',
		fontSize: 'calc(100% / ' + gridSize / 4 + ')',
	};

	return <td style={style}>{'x:' + cell.x + ', y:' + cell.y}</td>;
};

Cell.prototype = {
	cell: PropTypes.object.isRequired,
};

export default Cell;
