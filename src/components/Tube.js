import { TUBE_LENGTH, TUBE_WIDTH, } from "../utils/constants";

const Tube = ({position,}) => {
	const style = {
		stroke: "#000000",
		strokeWidth: 3,
	};

	return (
		<g>
			<line 
				style={style}
				x1={position.x} 
				y1={position.y}
				x2={position.x} 
				y2={position.y + TUBE_LENGTH}
			/>
			<line 
				style={style}
				x1={position.x} 
				y1={position.y + TUBE_LENGTH}
				x2={position.x + TUBE_WIDTH} 
				y2={position.y + TUBE_LENGTH}
			/>
			<line 
				style={style}
				x1={position.x + TUBE_WIDTH} 
				y1={position.y}
				x2={position.x + TUBE_WIDTH} 
				y2={position.y + TUBE_LENGTH}
			/>
		</g>
	);
};

export default Tube;