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