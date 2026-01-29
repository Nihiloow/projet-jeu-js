// src/managers/BallonManager.js
import { Container } from "../components/Container.js";
import { Ballon } from "../entities/mobs/Ballon.js";
import roundsData from "../utils/data/round.json";

export class BallonManager {
  #container;
  #currentRoundIndex = 0;
  #spawnTimer = 0;
  #enemiesRemainingToSpawn = 0;
  #isSpawning = false;
  #mapName;
  #activeRoundData = null;

  constructor(mapName) {
    this.#container = new Container();
    this.#mapName = mapName;
  }

  get container() {
    return this.#container;
  }
  get isRoundActive() {
    return this.#isSpawning || this.#container.count > 0;
  }
  get canStartNext() {
    return !this.#isSpawning;
  }
  get currentRoundNumber() {
    return this.#currentRoundIndex + 1;
  }
  get enemies() {
    return this.#container.children;
  }

  startNextRound() {
    if (this.#isSpawning) return;
    let data =
      roundsData[this.#currentRoundIndex] ||
      this.#generateInfiniteRound(this.#currentRoundIndex);

    if (data) {
      this.#activeRoundData = data;
      this.#enemiesRemainingToSpawn = data.count;
      this.#spawnTimer = 0;
      this.#isSpawning = true;
      console.log(`Lancement du Round ${this.currentRoundNumber}`);
    }
  }

  // ✅ MODIFIÉ : On ajoute le retour de la valeur 'escaped'
  update(dt) {
    let escapedCount = 0;

    // 1. On détecte les fuyards AVANT l'update du container
    this.#container.children.forEach((mob) => {
      if (mob.hasReachedEnd && mob.hp > 0) {
        escapedCount++;
        mob.takeDamage(999); // On le tue pour qu'il soit nettoyé
      }
    });

    this.#handleSpawning(dt);
    this.#container.update(dt);

    if (this.#isSpawning && this.#enemiesRemainingToSpawn === 0) {
      this.#isSpawning = false;
      this.#currentRoundIndex++;
    }

    return escapedCount; // On renvoie le compte au GameScreen
  }

  #handleSpawning(dt) {
    if (
      !this.#isSpawning ||
      this.#enemiesRemainingToSpawn <= 0 ||
      !this.#activeRoundData
    )
      return;

    this.#spawnTimer += dt * 1000;

    if (this.#spawnTimer >= this.#activeRoundData.interval) {
      const enemy = new Ballon(
        this.#mapName,
        this.#activeRoundData.color,
        this.#activeRoundData.speed,
        this.#activeRoundData.hp,
      );
      this.#container.add(enemy);
      this.#spawnTimer = 0;
      this.#enemiesRemainingToSpawn--;
    }
  }

  #generateInfiniteRound(index) {
    const baseRound = roundsData[roundsData.length - 1];
    const extraLevel = index - roundsData.length + 1;
    return {
      count: baseRound.count + extraLevel * 2,
      interval: Math.max(150, baseRound.interval * Math.pow(0.9, extraLevel)),
      hp: Math.floor(baseRound.hp * Math.pow(1.15, extraLevel)),
      speed: Math.min(4, baseRound.speed + extraLevel * 0.05),
      color: "purple",
    };
  }

  draw(ctx) {
    this.#container.draw(ctx);
  }
}
