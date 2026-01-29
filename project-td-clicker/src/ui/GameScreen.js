import { Screen } from "./Screen.js";
import { Map } from "../entities/Map.js";
import { BallonManager } from "../managers/BallonManager.js";
import { PlacementTileManager } from "../managers/PlacementTileManager.js";
import { TowerManager } from "../managers/TowerManager.js";

export class GameScreen extends Screen {
  #map;
  #ballonManager;
  #placementTileManager;
  #TowerManager;

  #rawMouse = { x: 0, y: 0 };
  #score = 0;
  #money = 100; // On commence avec un peu d'argent pour tester
  #clickerZone = { x: 10, y: 250, w: 60, h: 60 }; // Coin inférieur gauche (10, 250)

  constructor(canvas, ctx) {
    super(canvas, ctx);

    this.#map = new Map("./public/assets/map1.png");
    this.#ballonManager = new BallonManager("map1");
    this.#placementTileManager = new PlacementTileManager(
      canvas,
      this.#rawMouse,
    );
    this.#TowerManager = new TowerManager(
      this.#placementTileManager,
      ctx,
      canvas,
    );

    this.#initEventListeners();
    this.#initClicker();
  }

  #initClicker() {
    this.canvas.addEventListener("click", (e) => {
      const mouse = this.getVirtualMousePos();

      // Vérification du clic sur le bouton de ressources
      if (this.#isInside(mouse, this.#clickerZone)) {
        this.#generateResource();
      }

      // Ici, on pourra plus tard ajouter le check pour acheter une tour
      // if (this.#money >= 50) { ... }
    });
  }

  #isInside(pos, zone) {
    return (
      pos.x >= zone.x &&
      pos.x <= zone.x + zone.w &&
      pos.y >= zone.y &&
      pos.y <= zone.y + zone.h
    );
  }

  #generateResource() {
    this.#money += 10;
    console.log("Argent généré : ", this.#money);
  }

  #initEventListeners() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.#rawMouse.x = e.clientX - rect.left;
      this.#rawMouse.y = e.clientY - rect.top;
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.#ballonManager.startNextRound();
      }
    });
  }

  getVirtualMousePos() {
    const { width, height } = this.canvas;
    const scale = Math.min(width / Map.WIDTH, height / Map.HEIGHT);
    const offsetX = (width - Map.WIDTH * scale) / 2;
    const offsetY = (height - Map.HEIGHT * scale) / 2;

    return {
      x: (this.#rawMouse.x - offsetX) / scale,
      y: (this.#rawMouse.y - offsetY) / scale,
    };
  }

  update(dt) {
    const virtualMouse = this.getVirtualMousePos();

    if (this.#placementTileManager) {
      this.#placementTileManager.update(virtualMouse);
    }

    if (this.#ballonManager) {
      this.#ballonManager.update(dt);
    }

    if (this.#TowerManager) {
      this.#TowerManager.update(dt);
    }
  }

  draw() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    // --- TRANSFORMATION (DÉBUT DU MONDE VIRTUEL) ---
    const scale = Math.min(width / Map.WIDTH, height / Map.HEIGHT);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-Map.WIDTH / 2, -Map.HEIGHT / 2);

    // 1. Décor
    this.#map.draw(ctx);

    // 2. Grille de placement (carrés blancs)
    if (this.#placementTileManager) {
      this.#placementTileManager.draw(ctx);
    }

    // 3. Tours
    if (this.#TowerManager) {
      this.#TowerManager.update();
    }

    // 4. Ennemis
    if (this.#ballonManager) {
      this.#ballonManager.draw(ctx);
    }

    // 5. Bouton Clicker
    this.#drawClickerButton(ctx);

    ctx.restore();
    // --- FIN DU MONDE VIRTUEL ---

    // 6. Interfaces fixes (HUD)
    this.#drawUI();
    this.#drawHUD();
  }

  #drawClickerButton(ctx) {
    ctx.fillStyle = "#e67e22"; // Orange
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.fillRect(
      this.#clickerZone.x,
      this.#clickerZone.y,
      this.#clickerZone.w,
      this.#clickerZone.h,
    );
    ctx.strokeRect(
      this.#clickerZone.x,
      this.#clickerZone.y,
      this.#clickerZone.w,
      this.#clickerZone.h,
    );

    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    // On dessine le texte au milieu du bouton
    ctx.fillText("CLIC", this.#clickerZone.x + 30, this.#clickerZone.y + 35);

    // Reset du text align pour ne pas impacter les autres draw
    ctx.textAlign = "left";
  }

  #drawUI() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold 16px Arial";
    const roundTxt = `Round: ${this.#ballonManager.currentRoundNumber}`;
    this.ctx.fillText(roundTxt, 20, 30);

    if (this.#ballonManager.canStartNext) {
      this.ctx.fillStyle = "#FFD700";
      this.ctx.fillText("Prêt ! Appuyez sur ESPACE", 20, 55);
    }
  }

  #drawHUD() {
    this.ctx.fillStyle = "gold";
    // Note: assurez-vous que la police est chargée ou utilisez Arial
    this.ctx.font = "bold 20px Arial";
    this.ctx.fillText(`$ ${this.#money}`, 20, 90);
  }
}
