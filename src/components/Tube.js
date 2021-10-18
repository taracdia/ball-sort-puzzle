import Ball from "./Ball";
import { Droppable, } from "react-beautiful-dnd";

const getTubeStyle = isDraggingOver => ({
	background: isDraggingOver ? "#404040" : "black",
	padding: 8,
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

export default function Tube({tube, index,}){
	return (
		<Droppable droppableId={`${index}`}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					style={getTubeStyle(snapshot.isDraggingOver)}
					{...provided.droppableProps}
				>
					{tube.map((item, index) => 
						<Ball
							item={item}
							index={index}
							key={item.id}
						/>
					)}
					{provided.placeholder}
				</div>

			)}
		</Droppable>
	);
}