import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  INIT_BOARD_POLL_SIZE,
  MAX_JUMP_HEIGHT,
  NEED_FILL_BOARD_LEVEL,
  NEED_FILL_BOARD_SIZE,
} from '../config';
import { findLastIndex } from 'lodash';
import music from '../utils/Music';

const typeSymbol = Symbol('type');

class Board extends Tiny.Container {
  constructor() {
    super();

    const { width, height } = Tiny.WIN_SIZE;

    this.setPosition(0, 0);
    this.width = width;
    this.height = height;
    this.respectRange = NEED_FILL_BOARD_SIZE;

    this.boardPoll = this.initBoardPoll();
    this.boardList = [];

    this.insertBoard((width - BOARD_WIDTH) / 2, height - BOARD_HEIGHT - 80);
    this.autoFillBoards();

    this.ticker = this.initTicker();
  }

  setRespectLevel(level) {
    const newRange = NEED_FILL_BOARD_SIZE + level * NEED_FILL_BOARD_LEVEL;
    this.respectRange = newRange > MAX_JUMP_HEIGHT ? MAX_JUMP_HEIGHT : newRange;

    const lastNormalBoardIndex = findLastIndex(this.boardList, (board) => {
      const { _y } = board.getPosition();
      return _y < 0 && board[typeSymbol] === 1;
    });
    if (lastNormalBoardIndex > -1) {
      const lastNormalBoard = this.boardList[lastNormalBoardIndex];
      const { _x, _y } = lastNormalBoard.getPosition();
      this.removeChild(lastNormalBoard);
      const newBoard = this.newBoard(4, _x, _y);
      this.boardList.splice(lastNormalBoardIndex, 1, newBoard);
      this.addChild(newBoard);
    }
  }

  scrollUp(scrollY) {
    this.boardList.forEach((board) => {
      const { _y } = board.getPosition();
      board.setPositionY(_y + scrollY);
    });
    this.autoFillBoards();
  }

  autoFillBoards() {
    if (!this.boardPoll.length) {
      return;
    }
    const { width } = Tiny.WIN_SIZE;
    const topBoard = this.boardList[this.boardList.length - 1];
    const { _y } = topBoard.getPosition();
    const x = Math.random() * (width - BOARD_WIDTH);
    const y = _y - (1 - Math.random() / 2) * this.respectRange;
    this.insertBoard(x, y);
    this.autoFillBoards();
  }

  insertBoard(x, y) {
    const board = this.getBoardFromPoll();
    board.setPosition(x, y);
    this.boardList.push(board);
  }

  getBoardFromPoll() {
    if (this.boardPoll.length) {
      return this.boardPoll.shift();
    } else {
      return this.newBoard();
    }
  }

  newBoard(type = 1, x = -BOARD_WIDTH, y = -BOARD_HEIGHT) {
    const board = Tiny.Sprite.fromImage(Tiny.resources[`board${type}PNG`]);
    board[typeSymbol] = type;
    board.width = BOARD_WIDTH;
    board.height = BOARD_HEIGHT;
    board.setPosition(x, y);
    this.addChild(board);
    return board;
  }

  initBoardPoll() {
    const boardPoll = [];
    for (let i = 0; i < INIT_BOARD_POLL_SIZE; i++) {
      boardPoll.push(this.newBoard());
    }
    return boardPoll;
  }

  initTicker() {
    const { height } = Tiny.WIN_SIZE;
    const ticker = new Tiny.ticker.Ticker();
    ticker.add(() => {
      const recycleBoardList = this.boardList.filter((board) => {
        const { _y } = board.getPosition();
        return _y > height;
      });
      this.boardList = this.boardList.filter(
        (board) => !recycleBoardList.includes(board)
      );
      this.boardPoll.push(...recycleBoardList);
    });
    ticker.start();
    return ticker;
  }

  getInspectRect(board) {
    const { x, y, width, height } = board.getBounds();
    return new Tiny.Rectangle(x, y, width, height / 3);
  }

  dealBoardEvent(board) {
    const targetIndex = this.boardList.findIndex((item) => item === board);
    if (targetIndex > -1) {
      if (board[typeSymbol] === 1) {
        music.play('jump');
      }
      if (board[typeSymbol] === 4) {
        this.boardList.splice(targetIndex, 1);
        this.boardPoll.push(board);
        this.autoFillBoards();
        music.play('disappear');
      }
    }
  }
}

export default Board;
