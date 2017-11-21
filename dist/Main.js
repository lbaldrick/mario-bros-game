'use strict';

var _Display = require('./display/Display');

var _Display2 = _interopRequireDefault(_Display);

var _Platform = require('./platform/Platform');

var _Platform2 = _interopRequireDefault(_Platform);

var _Mario = require('./actors/Mario');

var _Mario2 = _interopRequireDefault(_Mario);

var _Sprite = require('./sprite/Sprite');

var _Sprite2 = _interopRequireDefault(_Sprite);

var _Fireball = require('./actors/Fireball');

var _Fireball2 = _interopRequireDefault(_Fireball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DISPLAY_HEIGHT = 500;
var DISPLAY_WIDTH = 600;
var PLATFORM_OFFSET = DISPLAY_HEIGHT / 5;
var PLATFORM_HEIGHT = DISPLAY_HEIGHT / 50;
var MARIO_HEIGHT = 50;
var MARIO_WIDTH = 30;
var MARIO_VELOCITY = 15;
var GRAVITY = 5;
var MAX_JUMP_HEIGHT = 120;

var FIREBALL_VELOCITY = 1;

var startingJumpY = 0;

var imgRight = new Image();
var imgLeft = new Image();

var marioSpriteRight1 = new _Sprite2.default(imgRight, 418, 218, 30, 40);
var marioSpriteRight2 = new _Sprite2.default(imgRight, 388, 218, 30, 40);
var marioSpriteRight3 = new _Sprite2.default(imgRight, 362, 218, 30 - 4, 40);

var marioSpriteLeft1 = new _Sprite2.default(imgLeft, 0, 218, 30, 40);
var marioSpriteLeft2 = new _Sprite2.default(imgLeft, 30, 218, 30, 40);
var marioSpriteLeft3 = new _Sprite2.default(imgLeft, 59, 218, 30 - 4, 40);

var fireballSpriteRight1 = new _Sprite2.default(imgRight, 418, 218, 30, 40);
var fireballSpriteRight2 = new _Sprite2.default(imgRight, 388, 218, 30, 40);
var fireballSpriteRight3 = new _Sprite2.default(imgRight, 362, 218, 30 - 4, 40);

var fireballSpriteLeft1 = new _Sprite2.default(imgLeft, 0, 218, 30, 40);
var fireballSpriteLeft2 = new _Sprite2.default(imgLeft, 30, 218, 30, 40);
var fireballSpriteLeft3 = new _Sprite2.default(imgLeft, 59, 218, 30 - 4, 40);

var display = new _Display2.default(DISPLAY_HEIGHT, DISPLAY_WIDTH);

var main = function main() {
    var mario = void 0,
        fireball = void 0;

    var platforms = [[new _Platform2.default(0, PLATFORM_OFFSET, DISPLAY_WIDTH / 2.5, PLATFORM_HEIGHT), new _Platform2.default(DISPLAY_WIDTH - DISPLAY_WIDTH / 2.5, PLATFORM_OFFSET, DISPLAY_WIDTH / 2.5, PLATFORM_HEIGHT)], [new _Platform2.default(0, PLATFORM_OFFSET * 2, DISPLAY_WIDTH / 6, PLATFORM_HEIGHT), new _Platform2.default(DISPLAY_WIDTH / 6 + 100, PLATFORM_OFFSET * 2, DISPLAY_WIDTH / 3, PLATFORM_HEIGHT), new _Platform2.default(DISPLAY_WIDTH - DISPLAY_WIDTH / 6, PLATFORM_OFFSET * 2, DISPLAY_WIDTH / 6, PLATFORM_HEIGHT)], [new _Platform2.default(0, PLATFORM_OFFSET * 3, DISPLAY_WIDTH / 3, PLATFORM_HEIGHT), new _Platform2.default(DISPLAY_WIDTH - DISPLAY_WIDTH / 3, PLATFORM_OFFSET * 3, DISPLAY_WIDTH / 3, PLATFORM_HEIGHT)]];

    var hasCollidedWithPlatform = function hasCollidedWithPlatform(mario) {
        for (var x = 0; x < platforms.length; x++) {
            var platformLevel = platforms[x];
            for (var y = 0; y < platformLevel.length; y++) {
                var platform = platformLevel[y];
                if (mario.hasCollided(platform.xPos, platform.yPos, platform.width, platform.height)) {
                    console.log("collided on platform");
                    return true;
                }
            }
        }

        return false;
    };

    var isOnPlatform = function isOnPlatform(m) {
        for (var x = 0; x < platforms.length; x++) {
            var platformLevel = platforms[x];
            for (var y = 0; y < platformLevel.length; y++) {
                var platform = platformLevel[y];
                if (m.getYPos() + m.getHeight() <= platform.getYPos() + 15 && m.getYPos() + m.getHeight() >= platform.getYPos() && m.getXPos() <= platform.getXPos() + platform.getWidth() && m.getXPos() + m.getWidth() >= platform.getXPos()) {

                    return platform;
                }
            }
        }
        return null;
    };

    var isStandingOnGround = function isStandingOnGround(m) {
        return m.getYPos() >= DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT);
    };

    var isCurrentlyJumping = function isCurrentlyJumping(m) {
        return m.getIsMovingUp() && m.getYPos() <= startingJumpY && m.getYPos() > startingJumpY - MAX_JUMP_HEIGHT;
    };

    var drawForeground = function drawForeground() {
        display.clearForeground();
        display.drawSprite(mario.getImg(), mario.getXPos(), mario.getYPos(), mario.getWidth(), mario.getHeight());
    };

    var handleLandedOnPlatform = function handleLandedOnPlatform(m, platform) {
        m.setYPos(platform.yPos - m.height);
        m.standStill();
    };

    var handleStopMovingHorizonally = function handleStopMovingHorizonally(m) {
        if (m.getIsMovingUp()) {
            m.setYPos(startingJumpY);
        }
        m.standStill();
    };

    var handleFireball = function handleFireball() {
        fireball.setXPos(fireball.getXPos() + FIREBALL_VELOCITY);
        display.drawSprite(fireball.getImg(), fireball.getXPos(), fireball.getYPos(), fireball.getWidth(), fireball.getHeight());
    };

    var gameLoop = function gameLoop() {
        drawForeground();
        handleFireball();

        //is mario jumping
        if (isCurrentlyJumping(mario)) {
            //if mario has not landed on platform
            var platform = isOnPlatform(mario);

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

        requestAnimationFrame(gameLoop.bind(undefined));
    };

    imgRight.addEventListener('load', function () {
        mario = new _Mario2.default([marioSpriteLeft1, marioSpriteLeft2, marioSpriteLeft3], [marioSpriteRight1, marioSpriteRight2, marioSpriteRight3], DISPLAY_WIDTH / 2 - MARIO_WIDTH / 2, DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT), MARIO_WIDTH, MARIO_HEIGHT);

        fireball = new _Fireball2.default([fireballSpriteLeft1, fireballSpriteLeft2, fireballSpriteLeft3], [fireballSpriteRight1, fireballSpriteRight2, fireballSpriteRight3], 0, DISPLAY_HEIGHT - (PLATFORM_OFFSET + MARIO_HEIGHT), MARIO_WIDTH, MARIO_HEIGHT);

        display.drawSprite(mario.getImg(), mario.getXPos(), mario.getYPos(), mario.getWidth(), mario.getHeight());
        display.drawSprite(fireball.getImg(), fireball.getXPos(), fireball.getYPos(), fireball.getWidth(), fireball.getHeight());
        gameLoop();
    }, false);

    imgRight.src = 'img/MarioBrosRight.png';
    imgLeft.src = 'img/MarioBrosLeft.png';

    document.addEventListener("DOMContentLoaded", function () {
        display.create(document.querySelector('.game'), platforms);
    });

    document.addEventListener('keyup', function (event) {
        var keyCode = event.keyCode;

        console.log("keyup");
        switch (keyCode) {
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

    document.addEventListener('keydown', function (event) {
        var keyCode = event.keyCode;

        switch (keyCode) {
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