function distanceBetweenTwoPoints(point1, point2) {
	return Math.sqrt(
		Math.pow( (point1.x - point2.x) , 2) + 
		Math.pow( (point1.y - point2.y) , 2)
	);
}

function findClosestCircleValueToPlank(pankObject) {
	let plankPosition = pankObject.position;
	let distancesArray = arrayOfCircles.map(
		(circle) => {
			return {
				label: circle.label,
				distance: distanceBetweenTwoPoints(
					plankPosition,
					circle.position)
			}

		}
	);
	let closestCircleValue = distancesArray.sort((a, b) => {
		if (a.distance < b.distance) return -1;
		if (a.distance > b.distance) return 1;
		if (a.distance == b.distance) return 0;
	})[0].label.split(":")[1];
	return parseInt(closestCircleValue);
}
