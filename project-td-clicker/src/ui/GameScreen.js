import mapImage1 from "../../public/assets/map1.png";

import { Entity } from "../entities/Entity.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 320;

const img = new Image();
img.src = mapImage1;

const entity = new Entity(30, 30, "map1");

function animate() {
  requestAnimationFrame(animate);
  c.drawImage(img, 0, 0);
  entity.update(c);
}
animate();
