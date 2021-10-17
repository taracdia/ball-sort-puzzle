import React, { useState, } from "react";
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import { COLORS, SELECTED_COLORS, } from "./utils/constants";
import "./App.css";

const initializeArrays = () => {
	const colorArray = [
		[0, 1, 2, 0,],
		[0, 1, 2, 2,],
		[1, 2, 0, 1,],
		[],
		[],
	];

	const tubeArray = [];

	colorArray.forEach((tube, indexX) =>{
		tubeArray.push(
			tube.map((ball, indexY) => {
				return {
					colorId: ball,
					id: `${indexX}-${indexY}-${new Date().getTime()}`,
				};
			})
		);
	});
	return tubeArray;
};

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

const getBallStyle = (isDragging, draggableStyle, colorId) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	padding: grid * 2,
	margin: "0 auto",
	borderRadius: 25,
	width: 20,
	height: 20,

	// change background colour if dragging
	background: isDragging ? SELECTED_COLORS[colorId] : COLORS[colorId],

	// styles we need to apply on draggables
	...draggableStyle,
});
const getTubeStyle = isDraggingOver => ({
	background: isDraggingOver ? "#404040" : "black",
	padding: grid,
	minWidth: 50,
	height: 200,
	margin: 10,
	borderLeftWidth: 10,
	borderRightWidth: 10,
	borderTopWidth: 0,
	borderBottomWidth: 10,
	borderColor: "white",
	borderStyle: "solid",
	display: "flex",
	flexDirection: "column",
	justifyContent: "end",
});

function Ball({provided1, snapshot1, item,}){
	return (
		<div
			ref={provided1.innerRef}
			{...provided1.draggableProps}
			{...provided1.dragHandleProps}
			style={getBallStyle(
				snapshot1.isDragging,
				provided1.draggableProps.style,
				item.colorId
			)}
		>
		</div>
	);
}

function App() {
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
		// can only move to the same color
		if(tubes[dInd][0]){
			if (tubes[sInd][0].colorId !== tubes[dInd][0].colorId) return;
		}
		const endMove = move(tubes[sInd], tubes[dInd], source, destination);
		const newState = [...tubes,];
		newState[sInd] = endMove[sInd];
		newState[dInd] = endMove[dInd];

		setTubes(newState);
	}

	return (
		<div id="background">
			<DragDropContext onDragEnd={onDragEnd}>
				{tubes.map((tube, ind) => (
					<Droppable key={ind} droppableId={`${ind}`}>
						{(provided, snapshot) => (
							<div
								ref={provided.innerRef}
								style={getTubeStyle(snapshot.isDraggingOver)}
								{...provided.droppableProps}
							>
								{tube.map((item, index) => {
									const isDragDisabled = index > 0;
									return (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={index}
											isDragDisabled={isDragDisabled}
										>
											{(provided1, snapshot1) => (
												<Ball provided1={provided1}
													snapshot1={snapshot1}
													item={item} />
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</div>

						)}
					</Droppable>
				))}
			</DragDropContext>
		</div>
	);
}

export default App;
