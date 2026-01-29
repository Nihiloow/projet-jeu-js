// src/entities/towers/Tower.js
import { Entity } from "../Entity.js";

export class Tower extends Entity {
  constructor(x, y) {
    // x, y, width, height, hp, speed
    super(x, y, 16, 16, 100, 0);
  }

  // On reçoit le ctx (le pinceau) ici, à chaque frame
  draw(ctx) {
    // Sécurité absolue : on vérifie que c'est bien le contexte
    if (!ctx || typeof ctx.fillRect !== "function") return;

    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
