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
    element: document.body,
    engine: engine,
    options: {
        width: 1028,
        height: 1500,
        wireframes: false,
        background: '#06AED5'
    }
});

let world = engine.world;

$.get( "./merge-sort-resources/static.svg", function( data ) {

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
	[378.245 + 10, 19.745],
	[419.445 + 10, 19.745],
	[460.645 + 10, 19.745],
	[501.845 + 10, 19.745],
	[543.045 + 10, 19.745],
	[584.245 + 10, 19.745]
];

let arrayOfCircles = circlePostions.map((item) => {
	let number = getRandomInt(0, 9);
	numbersToBeSorted.push(number);
	let circle = new circleMaker(
		number, item[0], item[1]
	).makeCircle();
	World.add(world, circle);
	return circle;
});

Engine.run(engine);
Render.run(render);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

setInterval(function(){ 
	let allStationary = true;
	arrayOfCircles.forEach(
		(item, idx) => {
			if (item.speed > 0.3) {
				allStationary = false;
			}
		}
	);
	if (allStationary && actionsWhenObjectsStopMoving[currentIndexOfActionWhenBodiesStopMoving] != undefined) {
		actionsWhenObjectsStopMoving[currentIndexOfActionWhenBodiesStopMoving]();
		currentIndexOfActionWhenBodiesStopMoving += 1;
	}
}, 1000);		