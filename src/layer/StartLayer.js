import Background from '../model/Background';
import Role from '../model/Role';
import {
  CHARACTOR_HEIGHT,
  CHARACTOR_WIDTH,
  DEBOUNCE_VERT_SPEED,
  HORZ_SPEED,
  VERT_ADD_SPEED,
  VERT_SPEED_LIMIT,
} from '../config';
import Keyboard from 'tinyjs-plugin-keyboard';

class StartLayer extends Tiny.Container {
  constructor() {
    super();
    const { width, height } = Tiny.WIN_SIZE;

    const background = new Background();
    const role = new Role();
    role.setPosition(
      (width - CHARACTOR_WIDTH) / 2,
      (height - CHARACTOR_HEIGHT) / 2
    );

    this.initKeyScene();

    this.addChild(background, role);
    this.background = background;
    this.role = role;
    this.ticker = this.initTicker();

    this.roleVertSpeed = 0;
    this.isPressLeft = false;
    this.isPressRight = false;
  }

  initTicker() {
    const ticker = new Tiny.ticker.Ticker();
    ticker.start();
    setTimeout(() => {
      ticker.add((time) => this.onTicker(time));
    }, 0);
    return ticker;
  }

  onTicker(time) {
    const { width, height } = Tiny.WIN_SIZE;
    const { _x: oldX, _y: oldY } = this.role.getPosition();
    this.roleVertSpeed =
      this.roleVertSpeed < VERT_SPEED_LIMIT
        ? this.roleVertSpeed + time * VERT_ADD_SPEED
        : this.roleVertSpeed;

    if (this.isPressLeft && !this.isPressRight) {
      const leftLimit = 0;
      const newX = oldX - HORZ_SPEED * time;
      if (newX >= leftLimit) {
        this.role.setPositionX(newX);
      }
    }
    if (!this.isPressLeft && this.isPressRight) {
      const rightLimit = width - CHARACTOR_WIDTH;
      const newX = oldX + HORZ_SPEED * time;
      if (newX <= rightLimit) {
        this.role.setPositionX(newX);
      }
    }
    let newY = oldY + this.roleVertSpeed * time;
    this.role.setPositionY(newY);
    if (newY + CHARACTOR_HEIGHT > height) {
      this.doJump();
    }
  }

  doJump() {
    this.roleVertSpeed = DEBOUNCE_VERT_SPEED;
  }

  initKeyScene() {
    const leftKeyScene = new Keyboard(37);
    const rightKeyScene = new Keyboard(39);

    leftKeyScene.press = () => {
      this.isPressLeft = true;
      this.role.faceDirection('left');
    };
    leftKeyScene.release = () => {
      this.isPressLeft = false;
    };
    rightKeyScene.press = () => {
      this.isPressRight = true;
      this.role.faceDirection('right');
    };
    rightKeyScene.release = () => {
      this.isPressRight = false;
    };
  }
}

export default StartLayer;
