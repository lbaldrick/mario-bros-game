
export default class Display {

    constructor(height, width) {
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

    create(element, platforms) {
        this._draw(platforms);
        element.appendChild(this.bgCanvas);
        element.appendChild(this.canvas);
    }

    drawSprite(sprite, xPos, yPos, width, height) {
        this.ctx.drawImage(sprite.imgEl, sprite.xPos, sprite.yPos, sprite.width, sprite.height, xPos, yPos, width, height);
    }

    clearForeground() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    _draw(platforms) {
        this._drawPlatforms(platforms);
        this._drawGround();
    }

    _drawGround() {
        const groundHeight = this.height / 5;
        this.bgCtx.fillStyle = 'rgb(255, 165, 0)';
        this.bgCtx.fillRect(0, this.height - groundHeight, this.width, groundHeight)
    }

    _drawPlatforms(platforms) {
        platforms.forEach((platform) => platform.forEach((level) => this._drawPlatform(level)));
    }

    _drawPlatform(platform) {
        this.bgCtx.fillStyle = 'rgb(255, 165, 0)';
        this.bgCtx.fillRect(platform.xPos, platform.yPos, platform.width, platform.height);
    }
}