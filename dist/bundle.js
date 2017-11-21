(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
};

var Actor = function () {
    function Actor(imgsLeft, imgsRight, xPos, yPos, width, height) {
        _classCallCheck(this, Actor);

        this.imgsLeft = imgsLeft;
        this.imgsRight = imgsRight;
        this.currentImgIndex = 0;
        this.img = imgsLeft[this.currentImgIndex];
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.currentDirection = null;
    }

    _createClass(Actor, [{
        key: 'moveLeft',
        value: function moveLeft(velocity) {
            this.currentImgIndex = this.currentDirection !== DIRECTION.LEFT || this.currentImgIndex >= this.imgsLeft.length - 1 ? 0 : this.currentImgIndex + 1;
            this.currentDirection = DIRECTION.LEFT;
            this.img = this.imgsLeft[this.currentImgIndex];
            this.xPos -= velocity;
            return this.xPos;
        }
    }, {
        key: 'moveRight',
        value: function moveRight(velocity) {
            this.currentImgIndex = this.currentDirection !== DIRECTION.RIGHT || this.currentImgIndex >= this.imgsRight.length - 1 ? 0 : this.currentImgIndex + 1;
            this.currentDirection = DIRECTION.RIGHT;
            this.img = this.imgsRight[this.currentImgIndex];
            this.xPos += velocity;
            return this.xPos;
        }
    }, {
        key: 'moveUp',
        value: function moveUp(velocity) {
            this.yPos -= velocity;
            this.isMovingUp = true;
            this.isMovingDown = false;
        }
    }, {
        key: 'moveDown',
        value: function moveDown(velocity) {
            this.isMovingUp = false;
            this.isMovingDown = true;
            this.yPos += velocity;
        }
    }, {
        key: 'standStill',
        value: function standStill() {
            this.isMovingUp = false;
            this.isMovingDown = false;
            this.currentImgIndex = 0;
            if (this.currentDirection === DIRECTION.LEFT) {
                this.img = this.imgsLeft[this.currentImgIndex];
            } else {
                this.img = this.imgsRight[this.currentImgIndex];
            }

            this.currentDirection = null;
        }
    }, {
        key: 'resetVerticalMovement',
        value: function resetVerticalMovement() {
            this.isMovingUp = false;
            this.isMovingDown = false;
        }
    }, {
        key: 'getImg',
        value: function getImg() {
            return this.img;
        }
    }, {
        key: 'getXPos',
        value: function getXPos() {
            return this.xPos;
        }
    }, {
        key: 'getYPos',
        value: function getYPos() {
            return this.yPos;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this.width;
        }
    }, {
        key: 'getIsMovingUp',
        value: function getIsMovingUp() {
            return this.isMovingUp;
        }
    }, {
        key: 'setYPos',
        value: function setYPos(yPos) {
            this.yPos = yPos;
        }
    }, {
        key: 'setXPos',
        value: function setXPos(xPos) {
            this.xPos = xPos;
        }
    }, {
        key: 'hasCollided',
        value: function hasCollided(x, y, width, height) {
            return x < this.xPos + this.width && x + width > this.xPos && y < this.yPos + this.height && height + y > this.yPos;
        }
    }]);

    return Actor;
}();

exports.default = Actor;
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Actor2 = require('./Actor');

var _Actor3 = _interopRequireDefault(_Actor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fireball = function (_Actor) {
    _inherits(Fireball, _Actor);

    function Fireball() {
        var _ref;

        _classCallCheck(this, Fireball);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = Fireball.__proto__ || Object.getPrototypeOf(Fireball)).call.apply(_ref, [this].concat(props)));
    }

    return Fireball;
}(_Actor3.default);

exports.default = Fireball;
},{"./Actor":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Actor2 = require('./Actor');

var _Actor3 = _interopRequireDefault(_Actor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mario = function (_Actor) {
    _inherits(Mario, _Actor);

    function Mario() {
        var _ref;

        _classCallCheck(this, Mario);

        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
            props[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(this, (_ref = Mario.__proto__ || Object.getPrototypeOf(Mario)).call.apply(_ref, [this].concat(props)));
    }

    return Mario;
}(_Actor3.default);

exports.default = Mario;
},{"./Actor":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Display = function () {
    function Display(height, width) {
        _classCallCheck(this, Display);

        this.bgCanvas = document.createElement('canvas');
        this.bgCanvas.classList.add('bg-canvas');
        this.bgCanvas.height = this.height = height;
        this.bgCanvas.width = this.width = width;
        this.bgCtx = this.bgCanvas.getContext('2d');
        this.bgCtx.fillStyle = 'black';
        this.bgCtx.fillRect(0, 0, this.width, this.height);

        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('fg-canvas');
        this.canvas.height = this.height = height;
        this.canvas.width = this.width = width;
        this.ctx = this.canvas.getContext('2d');
    }

    _createClass(Display, [{
        key: 'create',
        value: function create(element, platforms) {
            this._draw(platforms);
            element.appendChild(this.bgCanvas);
            element.appendChild(this.canvas);
        }
    }, {
        key: 'drawSprite',
        value: function drawSprite(sprite, xPos, yPos, width, height) {
            this.ctx.drawImage(sprite.imgEl, sprite.xPos, sprite.yPos, sprite.width, sprite.height, xPos, yPos, width, height);
        }
    }, {
        key: 'clearForeground',
        value: function clearForeground() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }, {
        key: '_draw',
        value: function _draw(platforms) {
            this._drawPlatforms(platforms);
            this._drawGround();
        }
    }, {
        key: '_drawGround',
        value: function _drawGround() {
            var groundHeight = this.height / 5;
            this.bgCtx.fillStyle = 'rgb(255, 165, 0)';
            this.bgCtx.fillRect(0, this.height - groundHeight, this.width, groundHeight);
        }
    }, {
        key: '_drawPlatforms',
        value: function _drawPlatforms(platforms) {
            var _this = this;

            platforms.forEach(function (platform) {
                return platform.forEach(function (level) {
                    return _this._drawPlatform(level);
                });
            });
        }
    }, {
        key: '_drawPlatform',
        value: function _drawPlatform(platform) {
            this.bgCtx.fillStyle = 'rgb(255, 165, 0)';
            this.bgCtx.fillRect(platform.xPos, platform.yPos, platform.width, platform.height);
        }
    }]);

    return Display;
}();

exports.default = Display;
},{}],5:[function(require,module,exports){
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
},{"./actors/Fireball":2,"./actors/Mario":3,"./display/Display":4,"./platform/Platform":6,"./sprite/Sprite":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Platform = function () {
    function Platform(xPos, yPos, width, height) {
        _classCallCheck(this, Platform);

        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    _createClass(Platform, [{
        key: "getXPos",
        value: function getXPos() {
            return this.xPos;
        }
    }, {
        key: "getYPos",
        value: function getYPos() {
            return this.yPos;
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: "getWidth",
        value: function getWidth() {
            return this.width;
        }
    }]);

    return Platform;
}();

exports.default = Platform;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(imgEl, xPos, yPos, width, height) {
    _classCallCheck(this, Sprite);

    this.imgEl = imgEl;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
};

exports.default = Sprite;
},{}]},{},[5]);
