
const DIRECTION = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
};

export default class Actor {

    constructor(imgsLeft, imgsRight, xPos, yPos, width, height) {
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

    moveLeft(velocity) {
        this.currentImgIndex = this.currentDirection !== DIRECTION.LEFT || this.currentImgIndex >= this.imgsLeft.length - 1 ? 0 : this.currentImgIndex + 1;
        this.currentDirection = DIRECTION.LEFT;
        this.img = this.imgsLeft[this.currentImgIndex];
        this.xPos -= velocity;
        return this.xPos;
    }

    moveRight(velocity) {
        this.currentImgIndex = this.currentDirection !== DIRECTION.RIGHT  || this.currentImgIndex >= this.imgsRight.length - 1 ? 0 : this.currentImgIndex + 1;
        this.currentDirection = DIRECTION.RIGHT;
        this.img = this.imgsRight[this.currentImgIndex];
        this.xPos += velocity;
        return this.xPos;
    }

    moveUp(velocity) {
        this.yPos -= velocity;
        this.isMovingUp = true;
        this.isMovingDown = false;
    }

    moveDown(velocity) {
        this.isMovingUp = false;
        this.isMovingDown = true;
        this.yPos += velocity;
    }

    standStill() {
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

    resetVerticalMovement() {
        this.isMovingUp = false;
        this.isMovingDown = false;
    }

    getImg() {
        return this.img;
    }

    getXPos() {
        return this.xPos;
    }

    getYPos() {
        return this.yPos;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getIsMovingUp() {
        return this.isMovingUp;
    }

    setYPos(yPos) {
        this.yPos = yPos;
    }

    setXPos(xPos) {
        this.xPos = xPos;
    }

    hasCollided(x, y, width, height) {
        return (x < this.xPos + this.width &&
            x + width > this.xPos &&
            y < this.yPos + this.height &&
            height + y > this.yPos);
    }
}