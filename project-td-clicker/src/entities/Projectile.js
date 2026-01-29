import { Entity } from "./Entity";

export class Projectile extends Entity {
  #velocity = {
    x: 0,
    y: 0,
  };

  constructor(x, y, width, height, hp, xSpeed, ySpeed, canvas) {
    super(x, y, width, height, hp, xSpeed);
    this.#velocity = {
      x: xSpeed,
      y: ySpeed,
    };
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff9100";
    ctx.closePath();
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
  }
}
