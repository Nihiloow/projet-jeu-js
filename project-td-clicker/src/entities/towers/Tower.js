// src/entities/towers/Tower.js
import { Entity } from "../Entity.js";
import { Projectile } from "../Projectile.js";

const sprite = "/assets/spr_tower_archer.png";

export class Tower extends Entity {
  #projectiles = [];

  constructor(x, y) {
    super(x, y, 16, 16, 1, 0, sprite);

    // On crée un projectile de test qui part en diagonale
    this.#projectiles.push(
      new Projectile(this.center.x, this.center.y, 10, 10, 10, 2, 2),
    );
  }

  // ✅ 1. UPDATE : Reçoit le temps (dt), gère uniquement la logique
  update(dt) {
    this.#projectiles.forEach((projectile) => {
      // On passe dt, qui est un NOMBRE
      projectile.update(dt);
    });

    // ❌ SURTOUT PAS DE this.draw(ctx) ICI !
  }

  // ✅ 2. DRAW : Reçoit le contexte (ctx), gère uniquement l'image
  draw(ctx) {
    if (!ctx) return;

    // Dessine l'archer (via GameObject/Entity)
    super.draw(ctx);

    // Dessine chaque projectile
    this.#projectiles.forEach((projectile) => {
      // On passe ctx, qui est l'OBJET de dessin
      projectile.draw(ctx);
    });
  }
}
