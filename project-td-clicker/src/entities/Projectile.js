// src/entities/Projectile.js
import { Entity } from "./Entity.js"; // N'oublie pas l'extension .js si nécessaire

export class Projectile extends Entity {
  #velocity = { x: 0, y: 0 };

  constructor(x, y, width, height, hp, xSpeed, ySpeed) {
    // Note: on a retiré "canvas" qui ne servait pas ici
    super(x, y, width, height, hp, xSpeed);
    this.#velocity = {
      x: xSpeed,
      y: ySpeed,
    };
  }

  // ✅ La méthode draw s'occupe UNIQUEMENT de l'affichage
  draw(ctx) {
    if (!ctx) return;
    ctx.beginPath();
    // On utilise this.x et this.y mis à jour par l'update
    ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff9100";
    ctx.fill();
    ctx.closePath();
  }

  // ✅ La méthode update s'occupe UNIQUEMENT du mouvement
  // Elle reçoit dt (Delta Time), pas ctx !
  update(dt) {
    // On multiplie par dt pour que le mouvement soit fluide peu importe les FPS
    // Si dt n'est pas passé, on met une valeur par défaut (0.016)
    const delta = dt || 0.016;

    this.x += this.#velocity.x * delta * 60;
    this.y += this.#velocity.y * delta * 60;

    // ❌ SURTOUT PAS DE this.draw(ctx) ICI !
  }
}
