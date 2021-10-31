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
import Score from '../utils/Score';
// import Button from '../utils/Button';
import Message from '../utils/Message';

class StartLayer extends Tiny.Container {
  constructor() {
    super();

    const role = new Role();
    const board = new Board();
    const background = new Background();
    const score = new Score();
    const message = new Message();
    // const button = new Button();

    this.initKeyEvent();
    this.initTouchEvent();
    this.addChild(background, board, score, role, message);

    this.background = background;
    this.role = role;
    this.board = board;
    this.score = score;
    // this.button = button;
    this.message = message;

    this.ticker = this.initTicker();
    this.music = new Music();

    this.roleVertSpeed = 0;
    this.isPressLeft = false;
    this.isPressRight = false;
    this.scrollTarget = 'role';

    message.on('start', () => {
      this.ticker.start();
    });

    // button.on('stop', () => {
    //   this.ticker.stop();
    // });
    // button.on('start', () => {
    //   this.ticker.start();
    // });

    this.setEventEnabled(true);
  }

  initTicker() {
    const ticker = new Tiny.ticker.Ticker();
    setTimeout(() => {
      ticker.add((time) => this.onTicker(time));
    }, 0);
    return ticker;
  }

  onTicker(time) {
    const role = this.role;
    const { width, height } = Tiny.WIN_SIZE;
    const { _x: oldRoleX, _y: oldRoleY } = role.getPosition();
    this.roleVertSpeed =
      this.roleVertSpeed < VERT_SPEED_LIMIT
        ? this.roleVertSpeed + time * VERT_ADD_SPEED
        : this.roleVertSpeed;

    if (this.isPressLeft && !this.isPressRight) {
      const leftLimit = 0;
      const newX = oldRoleX - HORZ_SPEED * time;
      if (newX >= leftLimit) {
        role.setPositionX(newX);
      }
    }
    if (!this.isPressLeft && this.isPressRight) {
      const rightLimit = width - ROLE_WIDTH;
      const newX = oldRoleX + HORZ_SPEED * time;
      if (newX <= rightLimit) {
        role.setPositionX(newX);
      }
    }

    if (this.roleVertSpeed >= 0) {
      const touchBoard = this.board.boardList.find((board) => {
        return Tiny.rectIntersectsRect(
          this.role.getInspectRect(),
          this.board.getInspectRect(board)
        );
      });
      if (touchBoard) {
        this.doJump();
        this.scrollTarget = oldRoleY < height / 2 ? 'board' : 'role';
      }
    }

    const scrollY = this.roleVertSpeed * time;
    let newY = oldRoleY + scrollY;
    if (this.scrollTarget === 'role' || this.roleVertSpeed > 0) {
      role.setPositionY(newY);
    } else {
      this.board.scrollUp(Math.abs(scrollY));
      this.score.addScore(Math.abs(scrollY));
      this.board.setRespectLevel(Math.floor(this.score.getScore() / 10));
    }

    if (newY + ROLE_HEIGHT > height) {

    }
  }

  doJump() {
    this.music.play('jump');
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
