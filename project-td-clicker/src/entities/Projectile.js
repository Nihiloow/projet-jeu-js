import { Entity } from "./Entity";

export class Projectile extends Entity {
  #velocity = {
    x: 0,
    y: 0,
  };
  #canvas;

  constructor(x, y, width, height, hp, xSpeed, ySpeed, canvas) {
    super(x, y, width, height, hp, xSpeed);
    this.#velocity = {
      x: xSpeed,
      y: ySpeed,
    };
    this.#canvas = canvas;
  }

  draw() {
    this.#canvas.beginPath();
    this.#canvas.arc(this.x, this.y, 4, 0, 2 * Math.PI);
    this.#canvas.fillStyle = "orange";
    this.#canvas.fill();
  }

  update() {
    this.draw();
  }
}
