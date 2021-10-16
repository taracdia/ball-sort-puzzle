const Ball = ({position,}) => {
	const ballStyle = {
		fill: "#777",
	};
	return (
		<circle
			style={ballStyle}
			cx={position.x}
			cy={position.y}
			r={20}
		/>
	);
};

export default Ball;