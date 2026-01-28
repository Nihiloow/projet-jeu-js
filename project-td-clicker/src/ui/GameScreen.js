import { Screen } from "./Screen.js";
import { Map } from "../entities/Map.js";
import { BallonManager } from "../managers/BallonManager.js";
import { PlacementTileManager } from "../managers/PlacementTileManager.js";

export class GameScreen extends Screen {
  #map;
  #ballonManager;
  #placementTileManager;
  #mouse = {
    x: undefined,
    y: undefined,
  };

  constructor(canvas, ctx) {
    super(canvas, ctx);
    this.#map = new Map("./public/assets/map1.png");
    this.#ballonManager = new BallonManager("map1");
    this.#placementTileManager = new PlacementTileManager(ctx, this.#mouse);

    // Écouteur pour lancer les rounds
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") this.#ballonManager.startNextRound();
    });

    window.addEventListener("mousemove", (event) => {
      this.#setMousePosition(event);
    });
  }

  #setMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    console.log(rect);
    this.#mouse.x = event.clientX - rect.left;
    this.#mouse.y = event.clientY - rect.top;
  }

  update(dt) {
    this.#ballonManager.update(dt);
  }

  draw() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    const scale = Math.min(width / Map.WIDTH, height / Map.HEIGHT);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-Map.WIDTH / 2, -Map.HEIGHT / 2);

    this.#map.draw(ctx);
    this.#ballonManager.draw(ctx); // Le manager dessine tous les ballons
    this.#placementTileManager.update();

    ctx.restore();
    this.#drawUI();
  }

  #drawUI() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 18px Arial";

    const roundTxt = `Round: ${this.#ballonManager.currentRoundNumber}`;
    this.ctx.fillText(roundTxt, 20, 30);

    // Si le manager a fini de spawner, on propose la suite
    if (this.#ballonManager.canStartNext) {
      this.ctx.fillStyle = "yellow";
      this.ctx.fillText(
        "Prêt ! Appuyez sur ESPACE pour la vague suivante",
        20,
        60,
      );
    }
  }
}
