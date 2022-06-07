import * as PIXI from 'pixi.js'
import { Button } from './button'
import { Game } from './game'

export class Startmenu{

        private _pixi: PIXI.Application
        private button: Button

        constructor() {
            console.log("Game created");

            this._pixi = new PIXI.Application({
              width: window.innerWidth,
              height: window.innerHeight,
              forceCanvas: true
            });
            document.body.appendChild(this._pixi.view);

        this.button = new Button(
            this._pixi.screen.width / 2,
            this._pixi.screen.height / 2
            )

        this._pixi.stage.addChild(this.button)

        this.button.on("pointerdown", () => this.onclick())

    }

    private onclick(){
        this.button.destroy()
        new Game(this._pixi)
    }
}

new Startmenu()