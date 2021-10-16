import Background from "./Background";
import Ball from "./Ball";
import Tube from "./Tube";

const Canvas = () => {
	const gameHeight = 1200;
	const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight,];

	const balls = [];

	for (let i = -3; i <= 3; i++){
		balls.push(<Ball position={{x: i * 100, y: -100,}} />);
	}

	return (
		<svg
			id="canvas"
			preserveAspectRatio="xMaxYMax none"
			viewBox={viewBox}
		>
			<Background />
			{balls}
			<Tube position={{x: 100, y: -500,}} />
		</svg>
	);
};
  
export default Canvas;