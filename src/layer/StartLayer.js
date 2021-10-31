import Background from '../model/Background';
import Role from '../model/Role';
import {
  ROLE_HEIGHT,
  ROLE_WIDTH,
  DEBOUNCE_VERT_SPEED,
  HORZ_SPEED,
  VERT_ADD_SPEED,
  VERT_SPEED_LIMIT,
} from '../config';
import Keyboard from 'tinyjs-plugin-keyboard';
import Music from '../utils/Music';
import Board from '../model/Board';

class StartLayer extends Tiny.Container {
  constructor() {
    super();

    const role = new Role();
    const board = new Board();
    const background = new Background();

    this.initKeyEvent();
    this.initTouchEvent();
    this.addChild(background, role, board);

    this.background = background;
    this.role = role;
    this.board = board;

    this.ticker = this.initTicker();
    this.music = new Music();

    this.roleVertSpeed = 0;
    this.isPressLeft = false;
    this.isPressRight = false;

    this.setEventEnabled(true);
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
    const role = this.role;
    const { width, height } = Tiny.WIN_SIZE;
    const { _x: oldX, _y: oldY } = role.getPosition();
    this.roleVertSpeed =
      this.roleVertSpeed < VERT_SPEED_LIMIT
        ? this.roleVertSpeed + time * VERT_ADD_SPEED
        : this.roleVertSpeed;

    if (this.isPressLeft && !this.isPressRight) {
      const leftLimit = 0;
      const newX = oldX - HORZ_SPEED * time;
      if (newX >= leftLimit) {
        role.setPositionX(newX);
      }
    }
    if (!this.isPressLeft && this.isPressRight) {
      const rightLimit = width - ROLE_WIDTH;
      const newX = oldX + HORZ_SPEED * time;
      if (newX <= rightLimit) {
        role.setPositionX(newX);
      }
    }

    if (this.roleVertSpeed >= 0) {
      const touchBoard = this.board.boardList.find((board) => {
        return this.role.isKnock(board);
      });
      if (touchBoard) {
        this.doJump();
        return;
      }
    }

    let newY = oldY + this.roleVertSpeed * time;
    role.setPositionY(newY);

    if (newY + ROLE_HEIGHT > height) {
      this.doJump();
    }
  }

  doJump() {
    // TODO: 嫌吵，先关了吧
    // this.music.play('jump');
    this.roleVertSpeed = DEBOUNCE_VERT_SPEED;
  }

  initKeyEvent() {
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

  initTouchEvent() {
    const { width } = Tiny.WIN_SIZE;
    this.on('pointerdown', (e) => {
      const { x } = e.data.getLocalPosition(this.parent);
      if (x < width / 2) {
        this.isPressLeft = true;
        this.role.faceDirection('left');
      } else {
        this.isPressRight = true;
        this.role.faceDirection('right');
      }
    });

    this.on('pointerup', (e) => {
      this.isPressLeft = false;
      this.isPressRight = false;
    });
  }
}

export default StartLayer;
