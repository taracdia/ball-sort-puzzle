export const initializeArrays = () => {
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