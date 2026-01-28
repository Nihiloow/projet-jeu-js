import { GameObject } from "../../components/GameObject";

export class PlacementTile extends GameObject {
  #canvas;
  #mouse;
  constructor(x, y, canvas, mouse) {
    super(x, y);
    this.#canvas = canvas;
    this.#mouse = mouse;
  }

  draw() {
    this.#canvas.fillStyle = "white";
    this.#canvas.fillRect(this.x, this.y, 16, 16);
  }

  update() {
    if (
      this.#mouse.x > this.x &&
      this.#mouse.x < this.x + 16 &&
      this.#mouse.y > this.y &&
      this.#mouse.y < this.y + 16
    ) {
      this.draw();
    }
  }
}
