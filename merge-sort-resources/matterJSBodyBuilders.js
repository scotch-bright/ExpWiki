const mmToPxMupliplicationFactor = 3.78;
const allCirclesWidthHeight = 37.510;

function getColorFromSVGNode(svgNode) {
	let styleValue = $(svgNode).attr("style");
	let fillProperty = styleValue.split(";").find(
		( property ) => {
			return property.split(":")[0] == 'fill';
		}
	);
	return fillProperty.split(":")[1];
}

function circleMaker(number, x, y) {
	this.number = number;
	this.x = x;
	this.y = y;
	this.makeCircle = () => {
		let finalX = allCirclesWidthHeight / 2 + x;
		let finalY = allCirclesWidthHeight / 2 + y;
		return Bodies.circle(finalX, finalY, allCirclesWidthHeight / 2, {
			label: `v:${this.number}`,
			render: {
                sprite: {
                    texture: `./merge-sort-resources/${this.number}.png`
                }
        	}
		});
	}
}

function bodyFromSvgPathMaker(svgPath, x, y, name) {
	this.svgPath = svgPath;
	
	this.x = x;
	
	this.y = y;

	this.name = name;
	
	this.makeBody = () => {
		let vertexSets = [];
		let points = Svg.pathToVertices(this.svgPath, 30);
		vertexSets.push(Vertices.scale(points, mmToPxMupliplicationFactor, mmToPxMupliplicationFactor));
		let body = Bodies.fromVertices(
			0, 0,
			vertexSets,
			{
                render: {
                    fillStyle: getColorFromSVGNode(this.svgPath),
                    strokeStyle: getColorFromSVGNode(this.svgPath),
                    lineWidth: 1
                },
                isStatic : true
            },
            true
		);

		Matter.Body.setPosition(body, {
			x: this.x,
			y: this.y
		});

		let translationVector = Vector.sub(body.position, body.bounds.min);
		Matter.Body.translate(body, translationVector);

		allBodies[this.name] = body;
		return body;
	}
}

function bodyFromRectangle(svgRectangle, name) {

	this.svgRectangle = svgRectangle;

	this.name = name;

	this.makeBody = () => {
		let body = Bodies.rectangle(
			0, 0, 
			parseFloat($(this.svgRectangle).attr("width")) * mmToPxMupliplicationFactor, 
			parseFloat($(this.svgRectangle).attr("height")) * mmToPxMupliplicationFactor, 
				{
                    render: {
                        fillStyle: getColorFromSVGNode(this.svgRectangle),
                        strokeStyle: getColorFromSVGNode(this.svgRectangle),
                        lineWidth: 1
                    },
                    isStatic : true
                }
			);

		Matter.Body.setPosition(body, {
			x: parseFloat($(this.svgRectangle).attr("x")) * mmToPxMupliplicationFactor,
			y: parseFloat($(this.svgRectangle).attr("y")) * mmToPxMupliplicationFactor
		});

		let translationVector = Vector.sub(body.position, body.bounds.min);
		Matter.Body.translate(body, translationVector);

		allBodies[this.name] = body;
		return body;
	}

}