import jQuery from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';

import _ from 'lodash';

let app;
let width = 900;
let height = 730;

let model = {
    createCanvas: function(){
        app = new PIXI.Application(width, height); //создаем холст
        document.body.appendChild(app.view); //выводим его в тело страницы

        PIXI.loader
            .add([
                "../img/ocean.jpg",
                "../img/ocean2.jpg"
            ])
            .load(setup);

        function setup() {
            let bgSprite = new PIXI.Sprite(
                PIXI.loader.resources["../img/ocean.jpg"].texture
            );
            let bgSprite2 = new PIXI.Sprite(
                PIXI.loader.resources["../img/ocean2.jpg"].texture
            );
            app.stage.addChild(bgSprite);
            app.stage.addChild(bgSprite2);

            let position = 0;
            app.ticker.add(function(){
                position += 10;

                bgSprite.x = -(position * 0.05);
                bgSprite.x %= 1100 * 2;
                if(bgSprite.x < 0)
                {
                    bgSprite.x += 1100 * 2;
                }
                bgSprite.x -= 1100;

                bgSprite2.x = -(position * 0.05) + 1100;
                bgSprite2.x %= 1100 * 2;
                if(bgSprite2.x < 0)
                if(bgSprite2.x < 0)
                {
                    bgSprite2.x += 1100 * 2;
                }
                bgSprite2.x -= 1100;
            })
        }
    }
};

let view = {
    loadGame: function(){
        model.createCanvas();
    }
};

view.loadGame(); //запускаем игру
