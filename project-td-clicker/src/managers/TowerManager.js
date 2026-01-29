import { Tower } from "../entities/towers/Tower.js";
export class TowerManager {
  #towerList = [];

  // Le constructeur n'a plus besoin de stocker ctx ou canvas !
  constructor() {}

  addTower(x, y) {
    // On crée la tour simplement avec sa position
    this.#towerList.push(new Tower(x, y));
  }

  update(ctx) {
    this.#towerList.forEach((tower) => {
      if (tower.update) tower.update(ctx);
    });
  }

  // Cette méthode est appelée par GameScreen.draw(ctx)
  draw(ctx) {
    this.#towerList.forEach((tower) => {
      // On passe le pinceau reçu du GameScreen à chaque tour
      tower.draw(ctx);
    });
  }
}
