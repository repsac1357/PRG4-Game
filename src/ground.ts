import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { Game } from "./game";

export class Ground extends PIXI.Sprite {
  private rigidBody: Matter.Body;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = Math.random() * window.innerWidth + 100;
    this.y = Math.random() * window.innerHeight;
    this.anchor.set(0.5);

    this.rigidBody = Matter.Bodies.rectangle(0, 500, 900, 100, {
      isStatic: true
    });
    Matter.Composite.add(game.engine.world, this.rigidBody);

    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
  }
}