import "../utils/data/mapPaths.json";
import mapPaths from "../utils/data/mapPaths.json";

export class Entity {
  #waypoints;
  #position = {
    x: 0,
    y: 0,
  };

  #size = {
    width: 10,
    height: 10,
  };

  #center = {
    x: null,
    y: null,
  };

  #waypointIndex = 1; // says which waypoint is tracked

  constructor(width, height, mapName, x, y) {
    if (typeof width === "number" && width > 0) {
      this.#size.width = width;
    } else {
      throw new Error("Width of entity must be a number greater than 0.");
    }

    if (typeof height === "number" && height > 0) {
      this.#size.height = height;
    } else {
      throw new Error("Height of entity must be a number greater than 0.");
    }

    this.#waypoints = this.#getPath(mapName);

    if (typeof x === "number") {
      this.#position.x = x;
    } else if (typeof x !== "undefined") {
      throw new Error("X coordinate must be a number.");
    } else {
      this.#position.x = this.#waypoints[0].x;
    }

    if (typeof y === "number") {
      this.#position.y = y;
    } else if (typeof y !== "undefined") {
      throw new Error("Y coordinate must be a number");
    } else {
      this.#position.y = this.#waypoints[0].y;
    }
    //center used to center entity on track
    this.#setCenter();

    //manual set of object on center of track for start
    this.#position.x -= this.#center.x - this.#position.x;
    this.#position.y -= this.#center.y - this.#position.y;
  }

  #setCenter() {
    this.#center.x = this.#position.x + this.#size.width / 2;
    this.#center.y = this.#position.y + this.#size.height / 2;
  }

  #getPath(mapName) {
    const currentMapPath = mapPaths[mapName];
    if (typeof currentMapPath !== "undefined") {
      return currentMapPath;
    }
    throw new Error("Map name not found in data file");
  }

  #draw(canvas) {
    canvas.fillStyle = "red";
    canvas.fillRect(
      this.#position.x,
      this.#position.y,
      this.#size.width,
      this.#size.height,
    );
  }

  update(canvas) {
    this.#draw(canvas);

    //pathfinding
    let waypoint = this.#waypoints[this.#waypointIndex];
    let yDistance = waypoint.y - this.#center.y;
    let xDistance = waypoint.x - this.#center.x;
    let angle = Math.atan2(yDistance, xDistance);

    this.#position.x += Math.cos(angle);
    this.#position.y += Math.sin(angle);

    this.#setCenter();

    //checks arrival towards waypoint
    if (
      Math.round(this.#center.x) === waypoint.x &&
      Math.round(this.#center.y) === waypoint.y
    ) {
      if (this.#waypointIndex < this.#waypoints.length - 1) {
        this.#waypointIndex++;
      } else {
        console.log("DAMAGE FUNCTION"); // ? call damage function here
      }

      console.log;
    }
  }
}
