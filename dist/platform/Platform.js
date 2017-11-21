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