$( document ).ready(function() {
    
    //vars
    var elements = [],
    ground = 560,
    levelSpeed =  15,
    cloudFactor = 0.01,
    level4Factor = 0.03,
    level5Factor = 0.05,
    level6Factor = 0.07,
    level7Factor = 0.26,
    level8Factor = 0.8,
    rotateToggel = true,
    is_dead = false,
    is_grounded = false;
    
    var platformLength = 5;
    var hideCounter = 10;
    
    var tl = new TimelineLite({paused: true});
    
    
    //sounds
    var sound = new Howl({
        src: ['base.mp3'],
        volume: 0.7,
        loop: true,
        rate: 1
    });
    sound.play();
    
    var scream = new Howl({
        src: ['scream.mp3'],
        volume: 0.1,
        loop: false,
        rate: 0.6
    });

   
    
    //Aliases
    let Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite,
        Rectangle = PIXI.Rectangle;
    var player,
        style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 60,
                fontWeight: 'bold',
                fill: ['#ffffff'], // gradient
                strokeThickness: 5,

                dropShadowColor: '#000000',
                //dropShadowBlur: 1,
                dropShadowAngle: Math.PI / 2,
                dropShadowDistance: 6,
        }),
        deadText = new PIXI.Text('Game Over', style),
        style2 = new PIXI.TextStyle({
                    fontFamily: 'Arial',
                    fontSize: 22,
                    fontWeight: 'bold',
                    fill: ['#ffffff'], // gradient
                    strokeThickness: 5,

                    dropShadowColor: '#000000',
                    //dropShadowBlur: 1,
                    dropShadowAngle: Math.PI / 2,
                    dropShadowDistance: 6,
            }),
        score = new PIXI.Text('0', style2);
    
    //Pixi Application
    let app = new Application({ 
            width: 1280, 
            height: 720,                       
            antialias: true, 
            transparent: false, 
            resolution: 1
        }
    );
    var renderer = PIXI.autoDetectRenderer(1280, 720);
    document.body.appendChild(app.view);
    
    let cloud1,
        cloud2,
        platform1,
        groundCol;
    
    var time = 0,
    counter = setInterval(function(){
        time++;
        score.setText(time);
        if(time%21 == 0) {
            levelSpeed += 1;
            //sound.rate(sound.rate() + 0.05);
        }
        console.log(sound.rate());
    },1000);

    loader
    .add("platform.png")
    .add("pig.png")
    .add("img/1.png")
    .add("img/2.png")
    .add("img/3.png")
    .add("img/4.png")
    .add("img/5.png")
    .add("img/6.png")
    .add("img/7.png")
    .add("img/8.png")
    .add('img/sprites1.json')
    .load(setup);
    
    
    
    function setup() {
        
        
        var frames = [];
        for (var i = 0; i < 17; i++) frames.push(PIXI.Texture.fromFrame('s' + (i+1)));
        player = new PIXI.extras.AnimatedSprite(frames);
        player.position.set(300);

        player.anchor.set(0.5);
        player.animationSpeed = 0.035 * levelSpeed;

        player.play();
        
        
        cloud1 = new Sprite(
            loader.resources["img/2.png"].texture
        );
        cloud2 = new Sprite(
            loader.resources["img/2.png"].texture
        );
        platform1 = new Sprite(
            loader.resources["platform.png"].texture
        );
        level1 = new Sprite(
            loader.resources["img/1.png"].texture
        );
        sun = new Sprite(
            loader.resources["img/3.png"].texture
        );
        level4_1 = new Sprite(
            loader.resources["img/4.png"].texture
        );
        level4_2 = new Sprite(
            loader.resources["img/4.png"].texture
        );
        level5_1 = new Sprite(
            loader.resources["img/5.png"].texture
        );
        level5_2 = new Sprite(
            loader.resources["img/5.png"].texture
        );
        level6_1 = new Sprite(
            loader.resources["img/6.png"].texture
        );
        level6_2 = new Sprite(
            loader.resources["img/6.png"].texture
        );
        level7_1 = new Sprite(
            loader.resources["img/7.png"].texture
        );
        level7_2 = new Sprite(
            loader.resources["img/7.png"].texture
        );
        level8_1 = new Sprite(
            loader.resources["img/8.png"].texture
        );
        level8_2 = new Sprite(
            loader.resources["img/8.png"].texture
        );
                
        level1.x = 0;
        cloud1.scale.x = 2;
        cloud1.scale.y = 2;
        cloud2.scale.x = 2;
        cloud2.scale.y = 2;
        cloud1.x = 0;
        cloud2.x = 1280;
        sun.x = 0;
        level4_1.scale.x = 2;
        level4_1.scale.y = 2;
        level4_2.scale.x = 2;
        level4_2.scale.y = 2;
        level4_1.x = 0;
        level4_2.x = 1280;
        
        level5_1.scale.x = 2;
        level5_1.scale.y = 2;
        level5_2.scale.x = 2;
        level5_2.scale.y = 2;
        level5_2.x = 1280;
        level5_1.x = 0;
        
        level6_1.scale.x = 2;
        level6_1.scale.y = 2;
        level6_2.scale.x = 2;
        level6_2.scale.y = 2;
        level6_2.x = 1280;
        level6_1.x = 0;
        
        level7_1.scale.x = 2;
        level7_1.scale.y = 2;
        level7_2.scale.x = 2;
        level7_2.scale.y = 2;
        level7_2.x = 1280;
        level7_1.x = 0;
        
        level8_1.scale.x = 2;
        level8_1.scale.y = 2;
        level8_2.scale.x = 2;
        level8_2.scale.y = 2;
        level8_2.x = 1280;
        level8_1.x = 0;
        
        
        
        app.stage.addChild(level1);
        app.stage.addChild(sun);
        app.stage.addChild(cloud1);
        app.stage.addChild(cloud2);
        app.stage.addChild(level4_1);
        app.stage.addChild(level4_2);
        app.stage.addChild(level5_1);
        app.stage.addChild(level5_2);
        app.stage.addChild(level6_1);
        app.stage.addChild(level6_2);
        app.stage.addChild(level7_1);
        app.stage.addChild(level7_2);
        
        
        /*var blurFilter = new PIXI.filters.BlurFilter();
        level5_1.filters = [blurFilter];
        level5_2.filters = [blurFilter];
        blurFilter.blur = 0.1;*/
        
        
        deadText.x = 640;
        deadText.y = 360;
        deadText.anchor.set(0.5,0.5);
        deadText.alpha = 0;
        
        score.x = 10;
        score.y = 10;
        //score.anchor.set(0.5,0.5);
        
        player.anchor.set(0.5,0.5);
        player.x = 200;
        player.y = 200;
        player.vx = 0;
        player.vy = 1;
        
        platform1.scale.x = 1.2;
        platform1.scale.y = 1.2;
        platform1.anchor.set(0.5,0.5);
        platform1.x = 900;
        platform1.y = 440;
        platform1.vx = 0;
        platform1.vy = 5;
        
        app.stage.addChild(player);

        initPlatforms();

        
        app.stage.addChild(level8_1);
        app.stage.addChild(level8_2);
        app.stage.addChild(deadText);
        app.stage.addChild(score);
        
        //Start the game loop by adding the `kgameLoop` function to
        //Pixi's `ticker` and providing it with a `delta` argument.
        app.ticker.add(delta => gameLoop(delta));
    }
    
    //inputs
    
    function keyboard(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = event => {
        if (event.keyCode === key.code) {
          if (key.isUp && key.press) key.press();
          key.isDown = true;
          key.isUp = false;
        }
        event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = event => {
        if (event.keyCode === key.code) {
          if (key.isDown && key.release) key.release();
          key.isDown = false;
          key.isUp = true;
        }
        event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
        "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
        "keyup", key.upHandler.bind(key), false
        );
        return key;
    }
    
    
    let space = keyboard(32);
    
    space.press = () => {
        if(is_grounded) {
            player.vy = -20;
            player.y -= 20; 
            is_grounded = false;
            TweenMax.to(player, 0.4, {
                rotation:"+="+(360 * Math.PI / 180)
            });   
        }
    };
    space.release = () => {
        
    };


    function gameLoop(delta){

        repeatBackground(cloud1, cloud2, cloudFactor);
        repeatBackground(level4_1, level4_2, level4Factor);
        repeatBackground(level5_1, level5_2, level5Factor);
        repeatBackground(level6_1, level6_2, level6Factor);
        repeatBackground(level7_1, level7_2, level7Factor);
        repeatBackground(level8_1, level8_2, level8Factor);
        
        calculateYcol();
        
        player.y += player.vy;
        
        movePlatforms();
        //rearangePlatforms();
        
    }
    
    function repeatBackground (object1,object2, factor ) {
        
        if(object1.x < -1278 + (levelSpeed * factor)) {
            object1.x = object2.x + object2.width;
        }  object1.x -= levelSpeed * factor;
        
        if(object2.x < -1278 + (levelSpeed * factor)) {
            object2.x = object1.x + object1.width;
        }  object2.x -= levelSpeed * factor;
    }
    
    function calculateYcol() {
        
        var isColliding = false;
        for (var i=0; i<elements.length; i++) {
            if(elements[i].x < 300 ) {
                if(hitTestRectangle(player, elements[i])) {
                    isColliding = true;
                    player.vy = 0;
                    if(player.y > elements[i].y) {
                        player.vy = 0;
                        player.y = elements[i].y + ( elements[i].height / 2 ) + (player.height / 2) + 1;
                    }
                    else {
                        // aici trebuie sa setam y-ul manual ca sa nu fie mici gapuri 
                        player.vy = 0;
                        player.y = elements[i].y - ( elements[i].height / 2 ) - (player.height / 2);
                        is_grounded = true;
                        //console.log('above');
                        //console.log(app.renderer.plugins.interaction.mouse.global);
                    }
                    break;
                }
            }
        }
        if (!isColliding) {
            player.vy += 1;
            if (player.y > 760 ) {
                if(levelSpeed > 0) levelSpeed -= 0.5;
                else {
                    if(!is_dead) {
                        scream.play();
                        sound.fade (0.7,0,10000);
                        scream.fade (0.1,0,4000);
                    }
                    is_dead = true;
                    levelSpeed = 0;
                    deadText.alpha = 1;
                    clearInterval(counter);
                } 
            }
        }
    }
    
    function calculateXcol() {
        for (var i=0; i<elements.length; i++) {
            if(hitTestRectangle(player, elements[i])) {
                if((player.x + ( player.width / 2 )) > (elements[i].x - (elements[i].width / 2) ) ) {
                    player.vy = 0;
                    player.x = elements[i].x - (elements[i].height / 2);
                }
            }
        }
    }
    
    function hitTestRectangle(r1, r2) {

      //Define the variables we'll need to calculate
      let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

      //hit will determine whether there's a collision
      hit = false; 

      //Find the half-widths and half-heights of each sprite
      r1.halfWidth = r1.width / 2;
      r1.halfHeight = r1.height / 2;
      r2.halfWidth = r2.width / 2;
      r2.halfHeight = r2.height / 2;

      //Calculate the distance vector between the sprites
      vx = r1.x - r2.x;
      vy = r1.y - r2.y;
      //Figure out the combined half-widths and half-heights
      combinedHalfWidths = r1.halfWidth + r2.halfWidth;
      combinedHalfHeights = r1.halfHeight + r2.halfHeight;
      //Check for a collision on the x axis
      if (Math.abs(vx) < combinedHalfWidths) {
        //A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {
          //There's definitely a collision happening
          hit = true;
        } else {
          //There's no collision on the y axis
          hit = false;
        }
      } else {
        //There's no collision on the x axis
        hit = false;
      }
      return hit;
    };
    
    function initPlatforms() {
        var i;
        for (i=0; i<30; i++) {
            platform1 = new Sprite(
                loader.resources["platform.png"].texture
            );

            platform1.scale.x = 1.2;
            platform1.scale.y = 1.2;
            platform1.anchor.set(0.5,0.5);
            platform1.x = i * platform1 .width;
            platform1.y = 600;
            platform1.vx = 0;
            platform1.vy = 5;
            
            elements.push(platform1);
            app.stage.addChild(platform1);
        }
    }
    
    function movePlatforms() {
        var i;
        if(elements[0].x < -470) {
            elements[0].x = elements[elements.length - 1].x + elements[0].width;
            if (platformLength > 0) {
                platformLength--;
                elements[0].y = elements[elements.length - 1].y
            } else {
                elements[0].y = setRandomY(elements[elements.length - 1].y);
                platformLength = 3 + Math.floor(Math.random() * 3 - 1);
                elements[0].x += 20 + Math.floor(Math.random() * 200);
            }
            
            var aux = elements.shift();
            elements.push(aux);
        }
        
        for (i=0; i<elements.length; i++) {
            elements[i].x -= levelSpeed * 0.5;
        }
    }
    
    function setRandomY(lastPlatform) {
        var y = Math.floor(Math.random() * (520 - (lastPlatform - 180)) + (lastPlatform - 140));
        return y;
    }
    
    function randomIntFromInterval(min,max){
        let result =  Math.floor(Math.random()*(max-min+1)+min);
        if(result < min){
            result = min;
        }
        else if(result > max){
            result = max;
        }
        return result;
    }
    
});

