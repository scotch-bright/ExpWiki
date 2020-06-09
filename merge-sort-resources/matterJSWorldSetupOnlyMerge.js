let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices,
    Common = Matter.Common,
    Vector = Matter.Vector;
     
let engine = Engine.create();
 
let render = Render.create({
    element: document.getElementById('where_the_canvas_comes'),
    engine: engine,
    options: {
        width: 1011,
        height: 637,
        wireframes: false,
        background: '#06AED5'
    }
});

let world = engine.world;

$.get( "./merge-sort-resources/merge.svg", function( data ) {

	// Draw All Paths
	$(data).find('path').each(function(i, path) {
		let fullID = $(path).attr("id");
		let objectName = fullID.split("_")[0];
		let objectX = fullID.split("_")[1];
		let objectY = fullID.split("_")[2];
		let bodyMaker = new bodyFromSvgPathMaker(
			path, 
			parseFloat(objectX),
			parseFloat(objectY),
			objectName
		);
		World.add(world, bodyMaker.makeBody());
	});

	// Draw All Rectangles
	$(data).find('rect').each(function(i, svgRect) {
		let objectName = $(svgRect).attr("id");
		let bodyMaker = new bodyFromRectangle(
			svgRect,
			objectName
		);
		World.add(world, bodyMaker.makeBody());
	});

});

let circlePostions = [
	[251.750, 93.339],
	[290.315, 93.339],
	[329.040, 93.339],
	[670.120, 93.339],
	[708.685, 93.339],
	[747.410, 93.339]
];

let sampleArrays = [
	[5, 3, 1, 2, 5, 8],
	[8, 2, 1, 1, 2, 8],
	[9, 2, 1, 4, 8, 9],
	[0, 0, 0, 2, 2, 2],
	[8, 2, 1, 1, 2, 8],
	[9, 2, 1, 0, 5, 9],
	[4, 3, 2, 1, 2, 7],
	[7, 3, 1, 3, 6, 6],
	[5, 2, 1, 0, 3, 9],
	[2, 1, 1, 1, 3, 7]
];

let sampleArrayIndex = getRandomInt(0, 9);
numbersToBeSorted = [...sampleArrays[sampleArrayIndex]];

let arrayOfCircles = circlePostions.map((item, circleIdx) => {
	number = numbersToBeSorted[circleIdx];
	let circle = new circleMaker(
		number, item[0], item[1]
	).makeCircle();
	World.add(world, circle);
	return circle;
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

		