import { COLORS, SELECTED_COLORS, } from "../utils/constants";
import { Draggable, } from "react-beautiful-dnd";

const getBallStyle = (isDragging, draggableStyle, colorId) => ({
	userSelect: "none",
	padding: 16,
	margin: "0 auto",
	borderRadius: 25,
	width: 20,
	height: 20,
	background: isDragging ? SELECTED_COLORS[colorId] : COLORS[colorId],
	...draggableStyle,
});

export default function Ball({item, index,}){
	const isDragDisabled = index > 0;
	return (
		<Draggable
			draggableId={item.id}
			index={index}
			isDragDisabled={isDragDisabled}
		>
			{(provided1, snapshot1) => (
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
			)}
		</Draggable>
	);
}