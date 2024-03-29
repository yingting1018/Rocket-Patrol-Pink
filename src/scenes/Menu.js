class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('sfx-select', './assets/Rocket Patrol/sfx-select.wav');
        this.load.audio('sfx-explosion', './assets/Rocket Patrol/sfx-explosion.wav');
        this.load.audio('sfx-shot', './assets/Rocket Patrol/sfx-shot.wav');
        this.load.audio('start', './assets/Rocket Patrol/start.wav');
        this.load.image('cover', './assets/Rocket Patrol/cover.png')
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // this.add.text(game.config.width/2, game.config.height/2 - borderUIsize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUIsize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.cover = this.add.tileSprite(0, 0, 640, 480, 'cover').setOrigin(0, 0); 
        let startmusic = this.sound.add('start', { volume: 0.3});
        startmusic.play();
        startmusic.setLoop(true);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          game.settings = {
            spaceshipSpeed: 3,
            pinkSpeed: 5,
            gameTimer: 60000    
          }
          this.sound.stopByKey('start');
          let startmusic = this.sound.add('start', { volume: 0.2});
          startmusic.play();
          startmusic.setLoop(true);
          this.sound.play('sfx-select');
          this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          game.settings = {
            spaceshipSpeed: 4,
            pinkSpeed: 6,
            gameTimer: 45000  
            
          }
          this.sound.stopByKey('start');
          let startmusic = this.sound.add('start', { volume: 0.2});
          startmusic.play();
          startmusic.setLoop(true);
          this.sound.play('sfx-select');
          this.scene.start("playScene");

        }
      }
}