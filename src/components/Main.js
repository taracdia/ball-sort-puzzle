import { useState, } from "react";
import { DragDropContext, } from "react-beautiful-dnd";
import Tube from "./Tube";
import { initializeGame, checkGameOver, } from "../utils/initialize";

export default function Main() {
	const [arrays, setArrays,] = useState(initializeGame());
	const [isGameOver, setGameOver,] = useState(false);

	function onDragEnd({ source, destination, }) {
		const tubes = arrays[arrays.length - 1];
		// dropped outside the list
		if (!destination) return;

		const sInd = +source.droppableId;
		const dInd = +destination.droppableId;

		// can't move within the same list
		if (sInd === dInd) return;
		// can only move from the top to the top
		if (source.index !== 0 || destination.index !== 0) return;
		// can only move to the same color
		if (tubes[dInd][0] && (tubes[sInd][0].colorId !== tubes[dInd][0].colorId)) return;
		// can't add more than 4
		if (tubes[dInd].length >= 4) return;

		const sourceClone = Array.from(tubes[sInd]);
		const destClone = Array.from(tubes[dInd]);
		const removed = sourceClone.shift(source.index);
		destClone.unshift(removed);

		const newState = [...tubes,];
		newState[sInd] = sourceClone;
		newState[dInd] = destClone;

		setArrays([...arrays, newState,]);
		setGameOver(checkGameOver(newState));
	}

	function restart(){
		setArrays([arrays[0],]);
		setGameOver(false);
	}

	function newGame(){
		setArrays(initializeGame());
		setGameOver(false);
	}

	function backButton(){
		if (arrays.length === 1) return;
		const newArray = Array.from(arrays);
		newArray.pop();
		setArrays(newArray);
		setGameOver(false);
	}

	function getHint(){

	}

	return (
		<>
			{
				isGameOver && (
					<div id="game-over-message">
						<h1>Congrats!</h1>
					</div>
				)
			}
			<div id="container">
				<div id="button-bar">
					<button onClick={restart}>Restart game</button>
					<button onClick={newGame}>New game</button>
					<button onClick={backButton}>Back</button>
					<button onClick={getHint}>Hint</button>
				</div>
				<div id="tube-container">
					<DragDropContext onDragEnd={onDragEnd}>
						{arrays[arrays.length - 1].map((tube, index) => (
							<Tube tube={tube} index={index} key={index} />
						))}
					</DragDropContext>
				</div>
			</div>
		</>
	);
}

