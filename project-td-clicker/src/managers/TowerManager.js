import { Tower } from "../entities/towers/Tower";

export class TowerManager {
  #placementTileManager;
  #towerList = [];
  #activeTile = undefined;
  #ctx;
  #canvas;

  constructor(placementTileManager, ctx, canvas) {
    this.#placementTileManager = placementTileManager;
    this.#ctx = ctx;
    this.#canvas = canvas;

    //event to create tower on click
    this.#canvas.addEventListener("click", (event) => {
      if (this.#activeTile) {
        let isEmpty = true;
        this.#towerList.forEach((tower) => {
          if (
            tower.x === this.#activeTile.x &&
            tower.y === this.#activeTile.y
          ) {
            isEmpty = false;
          }
        });
        if (isEmpty) {
          this.#towerList.push(
            new Tower(this.#activeTile.x, this.#activeTile.y, this.#ctx),
          );
        }
      }
    });
  }

  update() {
    //finds active tile
    this.#activeTile = null;
    this.#placementTileManager.placementTiles.forEach((tile) => {
      if (tile.isHovered) {
        return (this.#activeTile = tile);
      }
    });

    //draws the list of towers
    this.#towerList.forEach((tower) => tower.draw());
  }
}
