import * as PIXI from "pixi.js";
import fishImage from "./images/fish.png";
import gameAchtergrondImage from "./images/gameAchtergrond.jpg";
import sharkImage from "./images/shark.png";
import { Fish } from "./fish";
import { Shark } from "./shark";

export class Game {
  pixi: PIXI.Application;
  fishes: Fish[] = [];
  loader: PIXI.Loader;
  shark: Shark;

    constructor(pixi: PIXI.Application) {
      this.pixi = pixi
      //
      // STAP 2 - preload alle afbeeldingen
      //
      this.loader = new PIXI.Loader();
      this.loader
        .add("fishTexture", fishImage)
        .add("gameAchtergrondTexture", gameAchtergrondImage)
        .add("sharkTexture", sharkImage);
      this.loader.load(() => this.loadCompleted());
  }
  //
  // STAP 3 - maak een sprite als de afbeeldingen zijn geladen
  //
  loadCompleted() {
    // first load background
    let background = new PIXI.Sprite(
      this.loader.resources["gameAchtergrondTexture"].texture!
    );
    background.scale.set(
      window.innerWidth / background.getBounds().width,
      window.innerHeight / background.getBounds().height
    );
    this.pixi.stage.addChild(background);

    for (let i = 0; i < 20; i++) {
      let fish = new Fish(this.loader.resources["fishTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    // create Shark
    this.shark = new Shark(
      this.loader.resources["sharkTexture"].texture!,
      this
    );
    this.pixi.stage.addChild(this.shark);

    this.pixi.ticker.add((delta: number) => this.update(delta));
  }
  update(delta: number) {
    this.shark.update();

    //doorloopt alle fishes
    for (const fish of this.fishes) {
      fish.update(delta);
      for (const fish2 of this.fishes){

        //collision tussen fish en fish2
        if (fish !=fish2) {
        if ( this.collision(fish, fish2) ) {
          fish.tint = 0xff0000          
        }

        }

        //collision tussen de shark en fish
        if (this.collision(this.shark, fish)) {
          // console.log("SHARK ATTACK!!!!");
          this.pixi.stage.removeChild(fish);
        }
      }
    }

    // when the shark is the only survivor
    if (
      this.pixi.stage.children.filter((object) => object instanceof Fish)
        .length === 0
    ) {
      console.log("YOU WIN");
      let text = new PIXI.Text("You WIN!!", { fill: ["#ffffff"] });
      text.x = this.pixi.screen.width / 2;
      text.y = this.pixi.screen.height / 2;
      this.pixi.stage.addChild(text);
    }
  }

  collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }
}