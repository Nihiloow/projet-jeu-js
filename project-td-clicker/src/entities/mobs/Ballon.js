import { Entity } from "../Entity.js";
import mapPaths from "../../utils/data/mapPaths.json";

export class Ballon extends Entity {
  #waypoints;
  #waypointIndex = 1;
  #hasReachedEnd = false; // ✅ On déclare la variable ici pour pouvoir l'utiliser

  constructor(mapName, color, speed, hp = 10) {
    const path = mapPaths[mapName];
    if (!path) throw new Error(`Path ${mapName} non trouvé`);

    // On garde ton cookie.png
    const spritePath = `/assets/cookie.png`;

    super(path[0].x, path[0].y, 25, 25, hp, speed, spritePath);

    this.#waypoints = path;

    // Ajustement pour centrer l'image
    this.x -= this.width / 2;
    this.y -= this.height / 2;
  }

  /**
   * ✅ Le "pont" vers l'extérieur : permet au manager de lire l'état
   */
  get hasReachedEnd() {
    return this.#hasReachedEnd;
  }

  update(dt) {
    // Si on a atteint le dernier point du chemin
    if (this.#waypointIndex >= this.#waypoints.length) {
      this.#hasReachedEnd = true;
      // Note : on ne met pas takeDamage(999) ici, car on veut que le
      // Manager ait le temps de compter la fuite dans sa boucle.
      return;
    }

    const target = this.#waypoints[this.#waypointIndex];
    const dx = target.x - this.center.x;
    const dy = target.y - this.center.y;
    const distance = Math.hypot(dx, dy);

    // Calcul du pas de mouvement fluide
    const moveStep = this.speed * (dt || 0.016) * 60;

    if (distance < moveStep) {
      this.#waypointIndex++;
    } else {
      const angle = Math.atan2(dy, dx);
      this.x += Math.cos(angle) * moveStep;
      this.y += Math.sin(angle) * moveStep;
    }
  }
}
