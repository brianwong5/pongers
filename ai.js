class AI {
  constructor(paddle, ball) {
    this.p = paddle;
    this.ball = ball;
    this.targetY = stage.height / 2;
    this.randomOffset = this.p.h / 2;
    this.state = this.idle;
  }

  // interface for controlling the paddle
  get uKey() { return this.p.controls.uKey; }
  get dKey() { return this.p.controls.dKey; }
  press(key) { this.p.handleInput(key, true); }
  release(key) { this.p.handleInput(key, false); }
  goUp() {
    this.press(this.uKey);
    this.release(this.dKey);
  }
  goDown() {
    this.release(this.uKey);
    this.press(this.dKey);
  }
  doNothing() {
    this.release(this.uKey);
    this.release(this.dKey);
  }
  // end of interface

  moveTo(y) {
    if (y < this.p.y + this.randomOffset - this.p.speed) {
      this.goUp();
    } else if (y > this.p.y + this.randomOffset + this.p.speed) {
      this.goDown();
    } else {
      this.doNothing();
    }
  }

  predictBallLocation() {
    let b = ball.clone();
    if (this.p.rightSide) {
      while (b.x < this.p.x) {
        b.update(false);
      }
    } else {
      while (b.x > this.p.x + this.p.w) {
        b.update(false);
      }
    }
    this.randomOffset = Math.random() * (this.p.h * 0.9 - this.p.h * 0.1) + this.p.h * 0.1;
    this.targetY = b.y;
    // console.log(this.targetY, this.randomOffset)
  }

  idle() {
    this.doNothing();
    if (this.p.rightSide) {
      if (this.ball.xSpeed > 0) this.state = this.predict;
    } else {
      if (this.ball.xSpeed < 0) this.state = this.predict;
    }
  }

  predict() {
    this.predictBallLocation();
    this.state = this.tracking;
  }

  tracking() {
    this.moveTo(this.targetY);
    if (this.p.rightSide) {
      // draw ghost ball
      // ctx.arc(this.p.x, this.targetY, this.ball.r, 0, 2 * Math.PI);
      // ctx.fill();
      if (this.ball.xSpeed < 0 || this.ball.x >= this.p.x) this.state = this.idle;
    } else {
      // ctx.arc(this.p.x + this.p.w, this.targetY, this.ball.r, 0, 2 * Math.PI);
      // ctx.fill();
      if (this.ball.xSpeed > 0 || this.ball.x <= this.p.x + this.p.w) this.state = this.idle;
    }
  }

  think() {
    this.state();
  }
}
