import * as PIXI from "pixi.js";
import { Game } from "./game";

export class Wrestler extends PIXI.Sprite {
  private xspeed: number = 0;
  private yspeed: number = 0;
  private game: Game;
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;
    console.log("wrestler created");
    this.x = game.pixi.screen.width/2
    this.y = game.pixi.screen.height/2
    this.scale.set(-1, 1);

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
  }

  onKeyDown(e: KeyboardEvent): any {
    // // if (e.key === "ArrowUp") {
    // //   this.yspeed = -3;
    // // }
    // // if (e.key === "ArrowDown") {
    // //   this.yspeed = 3;
    // }
    if (e.key === "ArrowLeft") {
      this.xspeed = -3;
    }
    if (e.key === "ArrowRight") {
      this.xspeed = 3;
    }
  }
  onKeyUp(e: KeyboardEvent): any {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.xspeed = 0;
      this.yspeed = 0;
    }
  }

  public update() {
    this.y += this.yspeed;
    this.x += this.xspeed;
    this.keepInScreen();
  }

  private keepInScreen() {
    if (this.getBounds().right < this.game.pixi.screen.left) {
      this.x = this.game.pixi.screen.right;
    }
  }
}
