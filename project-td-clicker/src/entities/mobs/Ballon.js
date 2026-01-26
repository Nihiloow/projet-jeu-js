class Ballon {
  #hp;
  #speed;
  #texturePath;
  #isAlive;

  constructor(hp, speed, texturePath) {
    this.#hp = hp;
    this.#speed = speed;
    this.#texturePath = texturePath;
    this.#isAlive = isAlive();
  }

  getHp() {
    return this.#hp;
  }

  getSpeed() {
    return this.#speed;
  }

  getTexturePath() {
    return this.#texturePath;
  }

  takeDamage(damage) {
    this.#hp -= damage;
    if (this.#hp < 0) {
      this.#hp = 0;
    }
  }

  setSpeed(newSpeed) {
    if (newSpeed > 0) {
      this.#speed = newSpeed;
    } else {
      throw new Error("Speed cannot be lower than 0");
    }
  }

  isAlive() {
    if (this.#hp < 0) {
      return true;
    }
    return false;
  }
}
