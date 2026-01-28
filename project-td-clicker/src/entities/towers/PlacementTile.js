import { GameObject } from "../../components/GameObject.js";

export class PlacementTile extends GameObject {
  #isHovered = false;

  update(mouse) {
    // mouse est l'objet virtuel {x, y} envoyé par le manager
    this.#isHovered =
      mouse.x >= this.x &&
      mouse.x <= this.x + 16 &&
      mouse.y >= this.y &&
      mouse.y <= this.y + 16;
  }

  draw(ctx) {
    if (this.#isHovered) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillRect(this.x, this.y, 16, 16);
    }
  }
}
