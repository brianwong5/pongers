class Paddle {
  constructor(controls, right = false) {
    this.rightSide = right;
    this.w = 20;
    this.h = 100;
    this.x = right ? stage.width - 20 - this.w : 20;
    this.y = stage.height / 2 - this.h / 2;
    this.speed = 6;
    this.uPressed = false;
    this.dPressed = false;
    this.controls = controls;
  }

  handleInput(key, pressed) {
    if (key == this.controls.uKey) this.uPressed = pressed;
    if (key == this.controls.dKey) this.dPressed = pressed;
  }

  testBoundaries() {
    //top and bottom edge detection
    if (this.y <= 0) {
      this.y = 0;
    }
    else if (this.y >= stage.height - this.h) {
      this.y = stage.height - this.h;
    }
  }

  update() {
    if (this.uPressed) this.y -= this.speed;
    if (this.dPressed) this.y += this.speed;

    this.testBoundaries();
  }

  draw() {
    ctx.fillStyle = "#FFF";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
