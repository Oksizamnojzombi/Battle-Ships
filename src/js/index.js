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

            let positionBg = 0;
            app.ticker.add(function(){
                positionBg += 10;

                bgSprite.x = -(positionBg * 0.05);
                bgSprite.x %= 1100 * 2;
                if(bgSprite.x < 0)
                {
                    bgSprite.x += 1100 * 2;
                }
                bgSprite.x -= 1100;

                bgSprite2.x = -(positionBg * 0.05) + 1100;
                bgSprite2.x %= 1100 * 2;
                if(bgSprite2.x < 0)
                if(bgSprite2.x < 0)
                {
                    bgSprite2.x += 1100 * 2;
                }
                bgSprite2.x -= 1100;
            });


            // fields
            let fieldContainer = new PIXI.Container();
            app.stage.addChild(fieldContainer);

            let texture = PIXI.Texture.fromImage('../img/item.png');

            //create a 10x10 field
            for (let i = 0; i < 100; i++) {
                let field = new PIXI.Sprite(texture);
                // field.anchor.set(0);
                field.x = (i % 10) * 22;
                field.y = Math.floor(i / 10) * 22;
                fieldContainer.addChild(field);
            }

            // Center on the screen
            fieldContainer.x = (app.screen.width - fieldContainer.width) / 2;
            fieldContainer.y = (app.screen.height - fieldContainer.height) / 2;
        } // end setup
    }
};

let view = {
    loadGame: function(){
        model.createCanvas();
    }
};

view.loadGame(); //запускаем игру
