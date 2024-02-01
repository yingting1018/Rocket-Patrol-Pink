class Spaceship extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed

        this.timerEvent = scene.time.addEvent({
            delay: 1000, // 1 second
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true,
          });
      
          this.elapsedTime = 0;
        }
      
        onTimerTick() {
          this.elapsedTime += this.timerEvent.getElapsed();
          // Increase moveSpeed after 30 seconds (30000 milliseconds)
          if (this.elapsedTime >= 5000 && this.moveSpeed !== 10) {
            this.moveSpeed = 12;
      
            // Stop the timer event from repeating
            this.timerEvent.remove(false);
          }
        }
    

    update()
    {
        this.x -= this.moveSpeed
        if(this.x <= 0 - this.width)
        {
            this.reset()
        }
    }

    reset()
    {
        this.x = game.config.width
    }
}

class Pink extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue 
        this.moveSpeed = game.settings.pinkSpeed

        this.timerEvent = scene.time.addEvent({
            delay: 1000, // 1 second
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true,
          });
      
          this.elapsedTime = 0;
        }
      
        onTimerTick() {
          this.elapsedTime += this.timerEvent.getElapsed();
          // Increase moveSpeed after 30 seconds (30000 milliseconds)
          if (this.elapsedTime >= 5000 && this.moveSpeed !== 10) {
            this.moveSpeed = 15;
      
            // Stop the timer event from repeating
            this.timerEvent.remove(false);
          }
        }

    update()
    {
        this.x -= this.moveSpeed
        if(this.x <= 0 - this.width)
        {
            this.reset()
        }
    }

    reset()
    {
        this.x = game.config.width
    }
}