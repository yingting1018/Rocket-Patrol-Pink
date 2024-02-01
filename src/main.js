/*Name: Yingting Huang
Mod Title: Rocket Patrol Pink
Time: ~20 hours
Mods done:
-> 5 Points:
    Created a new spaceship: Pink spaceship that's faster and worth 20 points instead of 10 (I also changed
        all of the regular spaceships to just 10 points)
    New timing: When you hit a regular spaceship you get 2 seconds, pink spaceship 5 points, and missing 
        will subtract 10 points. 
-> 3 Points:
    Display time remaining: Top right corner timer
    Create new title screen
-> 1 Point:
    Implement FIRE UI: I printed fire in the top center of the game similar to the original, and I also have
        it go away when keyFIRE is pressed and show up once it's time to fire again.
    Add looping background music: I took a copyright-free sound from freesound.org and have it play until either 
        the left or right arrow is clicked.
        link: https://freesound.org/people/AudioCoffee/sounds/720624/
    Implement Speed Increase
*/
let config =
{
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt: true
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)
let borderUIsize = game.config.height / 15
let borderPadding = borderUIsize / 3

let keyFIRE, keyRESET, keyLEFT, keyRIGHT