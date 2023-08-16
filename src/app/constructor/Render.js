import Particle from "./Particle"

export default class Render {
	constructor(image, canvas) {
		this.image = image;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.particlesArray = [];
		this.numberOfParticles = 5000;
		this.imageMap = [];
		this.pixels = this.ctx.getImageData(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
	}

	createParticleList() {
		for (let i = 0; i < this.numberOfParticles; i++) {
			this.particlesArray.push(new Particle(this.canvas, this.imageMap, this.ctx));
		}
	}

	mapImage() {
		for (let y = 0; y < this.canvas.height; y++) {
			let row = [];
			for (let x = 0; x < this.canvas.width; x++) {
				const red = this.pixels.data[y * 4 * this.pixels.width + x * 4];
				const green = this.pixels.data[y * 4 * this.pixels.width + (x * 4 + 1)];
				const blue = this.pixels.data[y * 4 * this.pixels.width + (x * 4 + 2)];
				const brightness = this.calculateRelativeBrightness(red, green, blue);
				const cell = [brightness];
				row.push(cell);
			}
			this.imageMap.push(row);
		}
	}

	animateParticle() {
		this.ctx.globalAlpha = 0.5;
		this.ctx.fillStyle = "rgb(0,0,0)";
		this.ctx.globalAlpha = 0.2;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0; i < this.particlesArray.length; i++) {
			this.particlesArray[i].update();
			this.ctx.globalAlpha = this.particlesArray[i].speed * 0.5;
			this.particlesArray[i].draw();
		}
		requestAnimationFrame(this.animateParticle.bind(this));
	}

	calculateRelativeBrightness(red, green, blue) {
		return (
			Math.sqrt(
				red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
			) / 100
		);
	}

	init() {
		this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height)
		this.createParticleList();
		// console.log("this.particlesArray: ", this.particlesArray);
		this.mapImage();
		// console.log("this.imageMap: ", this.imageMap);
		this.animateParticle()
	}

}