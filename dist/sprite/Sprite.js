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