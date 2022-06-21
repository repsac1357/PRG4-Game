import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Button extends PIXI.Graphics{
    constructor(x: number, y: number){
        super()

        this.beginFill(0xFFBA00)
        this.drawRoundedRect(0, 0, 250, 80, 15)
        this.endFill()
        
        this.x = x - this.getBounds().width / 2
        this.y = y - this.getBounds().height / 2

        const startText = new PIXI.Text("Start Game", {
            "fontFamily": "\"Lucida Console\", Monaco, monospace",
            "fontSize": 30,
            "fontWeight": "bold"
        })
        startText.x = this.getBounds().width / 2
        startText.x =  this.getBounds().height / 3

        this.addChild(startText)

        this.buttonMode = true
        this.interactive = true 
    }
}