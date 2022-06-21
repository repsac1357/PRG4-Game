import * as PIXI from "pixi.js";
import Matter from "matter-js";
import fishImage from "./images/fish.png";
import gameAchtergrondImage from "./images/gameAchtergrond.jpg";
import wrestlerImage from "./images/wrestler.png";
import platformImage from "./images/platform.png";
import { Fish } from "./fish";
import { Ground } from "./ground";
import { Wrestler } from "./wrestler";
import soundtrack from "url:./soundtrack/mexico.mp3";


export class Game {
  public engine: Matter.Engine;
  pixi: PIXI.Application;
  fishes: Fish[] = [];
  loader: PIXI.Loader;
  wrestler: Wrestler;

    constructor(pixi: PIXI.Application) {
      this.pixi = pixi

      this.engine = Matter.Engine.create();
      //
      // STAP 2 - preload alle afbeeldingen
      //
      this.loader = new PIXI.Loader();
      this.loader
        .add("fishTexture", fishImage)
        .add("gameAchtergrondTexture", gameAchtergrondImage)
        .add("wrestlerTexture", wrestlerImage)
        .add("soundtrack", soundtrack)
        .add("platformTexture", platformImage)
      this.loader.load(() => this.loadCompleted());
  }
  //
  // STAP 3 - maak een sprite als de afbeeldingen zijn geladen
  //
  loadCompleted() {
    // first load backplatform
    let soundtrack = (this.loader.resources["soundtrack"].data!)
    soundtrack.play()
    let backplatform = new PIXI.Sprite(
      this.loader.resources["gameAchtergrondTexture"].texture!
    );
    backplatform.scale.set(
      window.innerWidth / backplatform.getBounds().width,
      window.innerHeight / backplatform.getBounds().height
    );
    this.pixi.stage.addChild(backplatform);

    for (let i = 0; i < 5; i++) {
      let fish = new Fish(this.loader.resources["fishTexture"].texture!, this);
      this.fishes.push(fish);
      this.pixi.stage.addChild(fish);
    }

    // create wrestler

        let platform = new Ground(
      this.loader.resources["platformTexture"].texture!,
      this
    );
    this.pixi.stage.addChild(platform);
    this.wrestler = new Wrestler(
      this.loader.resources["wrestlerTexture"].texture!,
      this
    );
    this.pixi.stage.addChild(this.wrestler);


    this.pixi.ticker.add((delta: number) => this.update(delta));
    Matter.Engine.update(this.engine, 1000 / 60);
  }
  update(delta: number) {
    this.wrestler.update();

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

        //collision tussen de wrestler en fish
        if (this.collision(this.wrestler, fish)) {
          // console.log("Wrestler ATTACK!!!!");
          this.pixi.stage.removeChild(fish);
        }
      }
    }

    // when the wrestler is the only survivor
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