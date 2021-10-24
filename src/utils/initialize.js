export const initializeGame = () => {
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
	return [tubeArray,];
};

export 	function checkGameOver(tubes){
	for (let i = 0; i < tubes.length; i++){
		const tube = tubes[i];
		if (tube.length !== 0){
			if(tube.length !== 4) return false;
			for (let i = 1; i < 4; i++){
				if (tube[0].colorId !== tube[i].colorId) return false;
			}
		}
	}
	return true;
}