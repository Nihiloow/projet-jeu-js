import { PlacementTile } from "../entities/towers/PlacementTile.js";
import map from "../utils/data/mapPaths.json";

export class PlacementTileManager {
  #tilePlacements = map.towerPlacements;
  #canvas;
  #mouse;

  #placementTiles = [];

  constructor(canvas, mouse) {
    this.#canvas = canvas;
    this.#mouse = mouse;
    this.init();
  }

  init() {
    this.#tilePlacements.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 1) {
          //add building placement tile here
          this.#placementTiles.push(
            new PlacementTile(x * 16, y * 16, this.#canvas, this.#mouse),
          );
        }
      });
    });
  }

  update() {
    this.#placementTiles.forEach((placementTile) =>
      placementTile.update(this.#mouse),
    );
  }
}
