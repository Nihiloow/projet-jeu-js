import { Entity } from "../Entity.js";
import { Projectile } from "../Projectile.js";

export class Tower extends Entity {
  #canvas;
  #projectiles = [];
  #center;

  constructor(x, y, canvas) {
    super(x, y, 16, 16, 1, 0);
    this.#canvas = canvas;
    this.#center = this.center;
    this.#projectiles.push(
      new Projectile(
        this.#center.x,
        this.#center.y,
        10,
        10,
        10,
        2,
        2,
        this.#canvas,
      ),
    );
  }

  draw() {
    this.#canvas.fillStyle = "blue";
    this.#canvas.fillRect(this.x, this.y, 16, 16);
  }

  update() {
    console.log(this.#canvas);
    this.draw();
    const angle = Math.atan2();
    this.#projectiles.forEach((projectile) => projectile.draw());
  }
}
