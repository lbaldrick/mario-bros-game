import Display from './display/Display';
import Platform from './platform/Platform';
import Mario from './actors/Mario';
import Sprite from './sprite/Sprite';
import Fireball from "./actors/Fireball";

const DISPLAY_HEIGHT = 500;
const DISPLAY_WIDTH = 600;
const PLATFORM_OFFSET = DISPLAY_HEIGHT / 5;
const PLATFORM_HEIGHT = DISPLAY_HEIGHT / 50;
const MARIO_HEIGHT = 50;
const MARIO_WIDTH = 30;
const MARIO_VELOCITY = 15;
const GRAVITY = 5;
const MAX_JUMP_HEIGHT = 120;

const FIREBALL_VELOCITY = 1;

let startingJumpY = 0;

const imgRight = new Image();
const imgLeft = new Image();

const marioSpriteRight1 = new Sprite(imgRight, 418, 218, 30, 40);
const marioSpriteRight2 = new Sprite(imgRight, 388, 218, 30, 40);
const marioSpriteRight3 = new Sprite(imgRight, 362, 218, 30 - 4, 40);

const marioSpriteLeft1 = new Sprite(imgLeft, 0, 218, 30, 40);
const marioSpriteLeft2 = new Sprite(imgLeft, 30, 218, 30, 40);
const marioSpriteLeft3 = new Sprite(imgLeft, 59, 218, 30 - 4, 40);


const fireballSpriteRight1 = new Sprite(imgRight, 418, 218, 30, 40);
const fireballSpriteRight2 = new Sprite(imgRight, 388, 218, 30, 40);
const fireballSpriteRight3 = new Sprite(imgRight, 362, 218, 30 - 4, 40);

const fireballSpriteLeft1 = new Sprite(imgLeft, 0, 218, 30, 40);
const fireballSpriteLeft2 = new Sprite(imgLeft, 30, 218, 30, 40);
const fireballSpriteLeft3 = new Sprite(imgLeft, 59, 218, 30 - 4, 40);


const display = new Display(DISPLAY_HEIGHT, DISPLAY_WIDTH);

const main = () => {
    let mario, fireball;

    const platforms = [
        [new Platform(0, PLATFORM_OFFSET, DISPLAY_WIDTH / 2.5, PLATFORM_HEIGHT),
            new Platform(DISPLAY_WIDTH - (DISPLAY_WIDTH / 2.5) , PLATFORM_OFFSET, DISPLAY_WIDTH / 2.5, PLATFORM_HEIGHT)],
        [new Platform(0, PLATFORM_OFFSET * 2, DISPLAY_WIDTH / 6, PLATFORM_HEIGHT),
            new Platform((DISPLAY_WIDTH / 6) + 100 , PLATFORM_OFFSET * 2, DISPLAY_WIDTH / 3, PLATFORM_HEIGHT),
            new Platform(DISPLAY_WIDTH - (DISPLAY_WIDTH / 6), PLATFORM_OFFSET * 2, DISPLAY_WIDTH / 6, PLATFORM_HEIGHT)],
        [new Platform(0, PLATFORM_OFFSET * 3, DISPLAY_WIDTH / 3, PLATFORM_HEIGHT),
            new Platform(DISPLAY_WIDTH - (DISPLAY_WIDTH / 3) , PLATFORM_OFFSET * 3, DISPLAY_WIDTH / 3, PLATFORM_HEIGHT)]
    ];

    const hasCollidedWithPlatform = (mario) => {
        for(let x = 0; x < platforms.length; x++) {
            const platformLevel = platforms[x];
            for(let y = 0; y < platformLevel.length; y++) {
                const platform = platformLevel[y];
                if (mario.hasCollided(platform.xPos, platform.yPos, platform.width, platform.height)) {
                    console.log("collided on platform");
                    return true;
                }
            }
        }

        return false;
    };

    const isOnPlatform = (m) => {
        for(let x = 0; x < platforms.length; x++) {
            const platformLevel = platforms[x];
            for(let y = 0; y < platformLevel.length; y++) {
                const platform = platformLevel[y];
                if (m.getYPos() + m.getHeight() <= platform.getYPos() + 15
                    && m.getYPos() + m.getHeight() >= platform.getYPos()
                    && m.getXPos() <=  platform.getXPos() + platform.getWidth()
                    && m.getXPos() +  m.getWidth() >= platform.getXPos()) {

                    return platform;
                }
            }
        }
        return null;
    };

    const isStandingOnGround = (m) => {
        return (m.getYPos() >= (DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT)));
    };

    const isCurrentlyJumping = (m) => {
        return m.getIsMovingUp() && (m.getYPos() <= startingJumpY && m.getYPos() > (startingJumpY - MAX_JUMP_HEIGHT))
    };

    const drawForeground = () => {
        display.clearForeground();
        display.drawSprite(mario.getImg(), mario.getXPos(), mario.getYPos(), mario.getWidth(), mario.getHeight());
    };

    const handleLandedOnPlatform = (m, platform) => {
        m.setYPos(platform.yPos - m.height);
        m.standStill();
    };

    const handleStopMovingHorizonally = (m) => {
        if (m.getIsMovingUp()) {
            m.setYPos(startingJumpY);
        }
        m.standStill();
    };

    const handleFireball = () => {
        fireball.setXPos(fireball.getXPos() + FIREBALL_VELOCITY);
        display.drawSprite(fireball.getImg(), fireball.getXPos(), fireball.getYPos(), fireball.getWidth(), fireball.getHeight());
    };

    const gameLoop = () => {
        drawForeground();
        handleFireball();

        //is mario jumping
        if (isCurrentlyJumping(mario)) {
            //if mario has not landed on platform
            const platform = isOnPlatform(mario);

            if (platform) {
                handleLandedOnPlatform(mario, platform);
                // if mario has collided wth a platform
            } else if (hasCollidedWithPlatform(mario)) {
                //stop jump
                mario.setYPos(startingJumpY);
                mario.standStill();
            } else {
                //keep moving up
                mario.moveUp(MARIO_VELOCITY);
                if (mario.currentDirection === 'LEFT') {
                    mario.moveLeft(MARIO_VELOCITY);
                } else if (mario.currentDirection === 'RIGHT') {
                    mario.moveRight(MARIO_VELOCITY);
                }
            }
        } else if (!isOnPlatform(mario) && !isStandingOnGround(mario)) {
           mario.moveDown(MARIO_VELOCITY);
        } else if (isOnPlatform(mario) || isStandingOnGround(mario)) {
            mario.resetVerticalMovement();
        }

        if (isStandingOnGround(mario)) {
            mario.setYPos(DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT));
        }

        requestAnimationFrame(gameLoop.bind(this));
    };

    imgRight.addEventListener('load', () => {
        mario = new Mario([marioSpriteLeft1, marioSpriteLeft2, marioSpriteLeft3],
            [marioSpriteRight1, marioSpriteRight2, marioSpriteRight3],
            (DISPLAY_WIDTH / 2) - (MARIO_WIDTH / 2),
            DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT), MARIO_WIDTH, MARIO_HEIGHT);

        fireball = new Fireball([fireballSpriteLeft1, fireballSpriteLeft2, fireballSpriteLeft3],
            [fireballSpriteRight1, fireballSpriteRight2, fireballSpriteRight3],
            0,
            DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT), MARIO_WIDTH, MARIO_HEIGHT);

        display.drawSprite(mario.getImg(), mario.getXPos(), mario.getYPos(), mario.getWidth(), mario.getHeight());
        display.drawSprite(fireball.getImg(), fireball.getXPos(), fireball.getYPos(), fireball.getWidth(), fireball.getHeight());
        gameLoop();
    }, false);

    imgRight.src = 'img/MarioBrosRight.png';
    imgLeft.src = 'img/MarioBrosLeft.png';

    document.addEventListener("DOMContentLoaded", () => {
        display.create(document.querySelector('.game'), platforms);
    });


    document.addEventListener('keyup', (event) => {
        const keyCode = event.keyCode;

        console.log("keyup");
        switch(keyCode) {
            //up
            case 87:

                break;
            //down
            case 83:
                break;
            case 65:
                handleStopMovingHorizonally(mario);
                break;
            case 68:
                handleStopMovingHorizonally(mario);
                break;
        }

    }, false);

    document.addEventListener('keydown', (event) => {
        const keyCode = event.keyCode;

        switch(keyCode) {
            //up
            case 87:
                if (!mario.getIsMovingUp()) {
                    startingJumpY = mario.getYPos();
                    mario.moveUp(MARIO_VELOCITY);
                }
                break;
            //down
            case 83:
                break;
            case 65:
                mario.moveLeft(MARIO_VELOCITY);
                break;
            case 68:
                mario.moveRight(MARIO_VELOCITY);
                break;
        }

    }, false);

};

main();