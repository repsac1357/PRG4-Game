import * as PIXI from 'pixi.js'
import { Button } from './button'
import { Game } from './game'
import mexicoAchtergrondImage from "./images/mexicoAchtergrond.jpg";

export class Startmenu {

    private _pixi: PIXI.Application;
    private button: Button;
    loader: PIXI.Loader;

    constructor() {
        console.log("Game created");

        this._pixi = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            forceCanvas: true
        });
        document.body.appendChild(this._pixi.view);
        //
        // STAP 2 - preload alle afbeeldingen
        //
        this.loader = new PIXI.Loader();
        this.loader
            .add("mexicoAchtergrondTexture", mexicoAchtergrondImage)
        this.loader.load(() => this.loadCompleted());
    }
    //
    // STAP 3 - maak een sprite als de afbeeldingen zijn geladen
    //
    loadCompleted() {
        // first load background
        let background = new PIXI.Sprite(
            this.loader.resources["mexicoAchtergrondTexture"].texture!
        );
        background.scale.set(
            window.innerWidth / background.getBounds().width,
            window.innerHeight / background.getBounds().height
        );
        this._pixi.stage.addChild(background);


        // sprite bg

        this.button = new Button(
            this._pixi.screen.width / 2,
            this._pixi.screen.height / 2
        )

        this._pixi.stage.addChild(this.button)

        this.button.on("pointerdown", () => this.onclick())

    }

    private onclick() {
        this.button.destroy()
        new Game(this._pixi)
    }
}

new Startmenu()

