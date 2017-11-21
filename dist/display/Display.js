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