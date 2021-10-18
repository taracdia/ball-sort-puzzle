import { useState, } from "react";
import { DragDropContext, } from "react-beautiful-dnd";
import Tube from "./Tube";
import { initializeArrays, } from "../utils/initialize";

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


export default function Main() {
	const [tubes, setTubes,] = useState(initializeArrays());

	function onDragEnd({ source, destination, }) {
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
		if(tubes[dInd][0] && (tubes[sInd][0].colorId !== tubes[dInd][0].colorId)) return;
		const endMove = move(tubes[sInd], tubes[dInd], source, destination);
		const newState = [...tubes,];
		newState[sInd] = endMove[sInd];
		newState[dInd] = endMove[dInd];

		setTubes(newState);
	}

	return (
		<div id="background">
			<DragDropContext onDragEnd={onDragEnd}>
				{tubes.map((tube, index) => (
					<Tube tube={tube} index={index} key={index} />
				))}
			</DragDropContext>
		</div>
	);
}

