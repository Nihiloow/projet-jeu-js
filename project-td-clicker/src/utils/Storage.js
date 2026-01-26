class Storage {
  #key;
  #isJson;

  constructor(key, isJson = false) {
    this.#key = key;
    this.#isJson = isJson;
  }

  set(value) {
    if (this.#isJson) value = JSON.stringify(value);
    localStorage.setItem(this.#key, value);
  }

  get() {
    const value = localStorage.getItem(this.#key);
    if (this.#isJson) return JSON.parse(value);

    return value;
  }

  delete() {
    localStorage.removeItem(this.#key);
  }
}

const userStorage = new Storage("user");
const gameStateStorage = new Storage("gameState", true);

gameStateStorage.set([{ nouvelle: "valeur" }]);
