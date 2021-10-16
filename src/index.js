import React, { useState, } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";

const initializeArrays = () => {

	const colorArray = [
		["blue", "red", "orange", "blue",],
		["blue", "red", "orange", "orange",],
		["red", "orange", "blue", "red",],
		[],
		[],
	];

	const tubeArray = [];

	colorArray.forEach((tube, indexX) =>{
		tubeArray.push(
			tube.map((ball, indexY) => {
				return {
					color: ball,
					id: `${indexX}-${indexY}-${new Date().getTime()}`,
				};
			})
		);
	});
	return tubeArray;

};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed,] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle, color) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	borderRadius: "25px",
	width: "20px",
	height: "20px",

	// change background colour if dragging
	background: isDragging ? "lightgreen" : color,

	// styles we need to apply on draggables
	...draggableStyle,
});
const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? "lightblue" : "lightgrey",
	padding: grid,
	width: 250,
});

function Ball({provided1, snapshot1, item,}){
	return (
		<div
			ref={provided1.innerRef}
			{...provided1.draggableProps}
			{...provided1.dragHandleProps}
			style={getItemStyle(
				snapshot1.isDragging,
				provided1.draggableProps.style,
				item.color
			)}
		>
		</div>
	);
}

function QuoteApp() {
	// const colors = ["blue", "red", "orange",];

	const [tubes, setTubes,] = useState(initializeArrays());

	function onDragEnd(result) {
		const { source, destination, } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}
		const sInd = +source.droppableId;
		const dInd = +destination.droppableId;

		// can't move within the same list
		if (sInd === dInd) {
			return;
		}
		// can only move from the top to the top
		if (source.index !== 0 || 
                destination.index !== 0) return;
		const endMove = move(tubes[sInd], tubes[dInd], source, destination);
		const newState = [...tubes,];
		newState[sInd] = endMove[sInd];
		newState[dInd] = endMove[dInd];

		setTubes(newState);
	}

	return (
		<div style={{ display: "flex", }}>
			<DragDropContext onDragEnd={onDragEnd}>
				{tubes.map((tube, ind) => (
					<Droppable key={ind} droppableId={`${ind}`}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								{...provided.droppableProps}
							>
								{tube.map((item, index) => (
									<Draggable
										key={item.id}
										draggableId={item.id}
										index={index}
									>
										{(provided1, snapshot1) => (
											<Ball provided1={provided1}
												snapshot1={snapshot1}
												item={item} />
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>

						)}
					</Droppable>
				))}
			</DragDropContext>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<QuoteApp />, rootElement);
