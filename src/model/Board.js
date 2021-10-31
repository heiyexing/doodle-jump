import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  INIT_BOARD_POLL_SIZE,
  NEED_FILL_BOARD_SIZE,
} from '../config';

class Board extends Tiny.Container {
  constructor() {
    super();

    const { width, height } = Tiny.WIN_SIZE;

    this.setPosition(0, 0);
    this.width = width;
    this.height = height;

    this.boardPoll = this.initBoardPoll();
    this.boardList = [];

    this.insertBoard((width - BOARD_WIDTH) / 2, height - BOARD_HEIGHT - 80);
    this.autoFillBoards();

    this.ticker = this.initTicker();
  }

  autoFillBoards() {
    if (!this.boardList.length) {
      return;
    }
    const topBoard = this.boardList[this.boardList.length - 1];
    const { _y } = topBoard.getPosition();
    if (_y > NEED_FILL_BOARD_SIZE) {
      const { width } = Tiny.WIN_SIZE;
      const x = Math.random() * (width - BOARD_WIDTH);
      const y = _y - (1 - Math.random() / 2) * NEED_FILL_BOARD_SIZE;
      this.insertBoard(x, y);
      this.autoFillBoards();
    }
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

  newBoard() {
    const board = Tiny.Sprite.fromImage(Tiny.resources['board1PNG']);
    board.width = BOARD_WIDTH;
    board.height = BOARD_HEIGHT;
    board.setPosition(-BOARD_WIDTH, -BOARD_HEIGHT);
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
      const recycleBoardList = this.boardList.filter(board => {
        const { _y } = board.getPosition();
        return _y > height;
      });
      this.boardList.filter(board => !recycleBoardList.includes(board));
      this.boardPoll.push(...recycleBoardList);
    });
    ticker.start();
    return ticker;
  }
}

export default Board;
