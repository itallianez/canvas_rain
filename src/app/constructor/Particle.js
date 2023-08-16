export default class Particle {
		constructor(canvas, imageMap, ctx) {
			this.canvas = canvas
			this.imageMap = imageMap
			this.ctx = ctx
			this.x = Math.random() * this.canvas.width;
			this.y = 0;
			this.speed = 0;
			this.velocity = Math.random() * 0.5;
			this.size = Math.random() * 1.5 + 1;
			this.position1 = Math.floor(this.y);
			this.position2 = Math.floor(this.x);
		}
		update() {
			this.position1 = Math.floor(this.y);
			this.position2 = Math.floor(this.x);
			this.speed = this.imageMap[this.position1][this.position2][0];
			let movement = 2.5 - this.speed + this.velocity;

			this.y += movement;
			if (this.y >= this.canvas.height) {
				this.y = 0;
				this.x = Math.random() * this.canvas.width;
			}
		}
		draw() {
			this.ctx.beginPath();
			this.ctx.fillStyle = "rgb(255,255,255)";
			this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			this.ctx.fill();
		}
	}