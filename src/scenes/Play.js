class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
    }

    preload() {
        this.load.image('rocket', './assets/Rocket Patrol/rocket.png');
        this.load.image('spaceship', './assets/Rocket Patrol/spaceship.png');
        this.load.image('sprite', './assets/Rocket Patrol/sprite.png');
        this.load.image('pink', './assets/Rocket Patrol/pink.png');
        this.load.spritesheet('explosion', './assets/Rocket Patrol/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        this.sprite = this.add.tileSprite(0, 0, 640, 480, 'sprite').setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUIsize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUIsize*6, borderUIsize*4, 'spaceship', 0, 10).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUIsize*3, borderUIsize*5 + borderPadding*2, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUIsize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Pink(this, game.config.width + borderUIsize*6, borderUIsize*4, 'pink', 0, 20).setOrigin(0, 0);
        this.ship05 = new Pink(this, game.config.width + borderUIsize*3, borderUIsize*5 + borderPadding*2, 'pink', 0, 20).setOrigin(0,0);
        this.ship06 = new Pink(this, game.config.width, borderUIsize*6 + borderPadding*4, 'pink', 0, 20).setOrigin(0,0);
        this.add.rectangle(0, borderUIsize + borderPadding, game.config.width, borderUIsize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUIsize, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });
        this.p1Score = 0;

        this.scoreLeft = this.add.text(borderUIsize + borderPadding, borderUIsize + borderPadding*2, this.p1Score, this.scoreConfig);

        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        }
        this.FireCenter = this.add.text(game.config.width / 2, borderUIsize + borderPadding*2, 'FIRE', fireConfig);
        this.FireCenter.visible = true;

        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = this.add.text(game.config.width - borderUIsize - borderPadding - timerConfig.fixedWidth, borderUIsize + borderPadding * 2, game.settings.gameTimer, this.scoreConfig);

        this.gameOver = false;

        this.scoreConfig.fixedWidth = 0;
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if (game.settings.gameTimer > 0)
        {
          game.settings.gameTimer -= 10;
        } else if (game.settings.gameTimer <= 0) {
            this.gameOver = true;
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← to Menu', this.scoreConfig).setOrigin(0.5);
        }
        this.timeLeft.setText(Math.floor(game.settings.gameTimer / 1000));

        if(this.p1Rocket.isFiring)
        {
            this.FireCenter.setVisible(false);
        }
        else
        {
            this.FireCenter.setVisible(true);
        }

        this.sprite.tilePositionX -= 4;  

        if(!this.gameOver) {
            this.p1Rocket.update();            
            this.ship01.update();              
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();              
            this.ship05.update();
            this.ship06.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            game.settings.gameTimer += 2000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            game.settings.gameTimer += 2000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            game.settings.gameTimer += 2000;
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
            game.settings.gameTimer += 5000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
            game.settings.gameTimer += 5000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship06)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship06);
            game.settings.gameTimer += 5000;
        }
        if(this.p1Rocket.y - 2 <= borderUIsize * 3 + borderPadding)
        {
            game.settings.gameTimer -= 10000;
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');          
        boom.on('animationcomplete', () => {    
            ship.reset();                        
            ship.alpha = 1;                       
            boom.destroy();                      
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx-explosion');
      }

}