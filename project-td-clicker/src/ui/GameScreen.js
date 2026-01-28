// src/ui/GameScreen.js
import { Screen } from "./Screen.js";
import { Map } from "../entities/Map.js";
import { Ballon } from "../entities/mobs/Ballon.js";

export class GameScreen extends Screen {
  #map;
  #testBallon;

  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.#map = new Map("./public/assets/map1.png");

    // mapName, color, speed
    this.#testBallon = new Ballon("map1", "red", 2);
  }

  update(dt) {
    // On met à jour la position du ballon
    if (this.#testBallon.isAlive) {
      this.#testBallon.update(dt);
    }
  }

  draw() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    // --- ESPACE VIRTUEL SCALÉ ---
    const scale = Math.min(width / Map.WIDTH, height / Map.HEIGHT);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-Map.WIDTH / 2, -Map.HEIGHT / 2);

    this.#map.draw(ctx);

    if (this.#testBallon.isAlive) {
      this.#testBallon.draw(ctx);
    }

    ctx.restore();
  }
}
