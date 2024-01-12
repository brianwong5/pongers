class Ball {
  constructor() {
    this.reset();
  }

  reset(right = false) {
    this.x = stage.width / 2;
    this.y = stage.height / 2;
    this.r = 10;
    this.xSpeed = right ? 6 : -6;
    this.ySpeed = Math.floor(Math.random() * 9) - 4; //0; //
  }

  clone() {
    let copy = new Ball();
    copy.x = this.x;
    copy.y = this.y;
    copy.r = this.r;
    copy.xSpeed = this.xSpeed;
    copy.ySpeed = this.ySpeed;
    return copy;
  }

  testBoundaries() {
    //setting top and bottom boundaries
    if (this.y <= this.r) {
      this.y = this.r;
      this.ySpeed *= -1;
    }
    else if (this.y >= stage.height - this.r) {
      this.y = stage.height - this.r;
      this.ySpeed *= -1;
    }
    //point scoring
    if (this.x <= this.r) {
      aiScore++;
      this.reset(false);
    }
    else if (this.x >= stage.width - this.r) {
      pScore++;
      this.reset(true);
    }
  }

  collides(other) {
    let x = this.x - this.r;
    let y = this.y - this.r;
    return (x < other.x + other.w) && (x + this.r > other.x)
      && (y < other.y + other.h) && (this.r * 2 + y > other.y);

  }

  hitTestPaddle(p) {
    //collision on paddle
    if (this.collides(p)) {
      this.xSpeed *= -1;
      this.ySpeed = (this.y - p.y - p.h / 2) / 5;
      // stop infinite loop
      if (p.rightSide) {
        this.x = p.x - this.r;
      } else {
        this.x = p.x + p.w + this.r;
      }
    }
  }

  update(hitTestPaddle = true) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    //collisions
    if (hitTestPaddle) {
      this.hitTestPaddle(p1);
      this.hitTestPaddle(p2);
    }
    this.testBoundaries();
  }

  draw() {
    ctx.fillStyle = "#FFF";
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}
