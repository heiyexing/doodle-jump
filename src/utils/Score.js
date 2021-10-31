class Score extends Tiny.Container {
  constructor() {
    super();

    const text = new Tiny.Text();
    text.style = {
      fontSize: '40px',
    };
    this.addChild(text);
    this.score = 0;
    this.text = text;
    this.addScore(0);
  }

  addScore(score) {
    const { width } = Tiny.WIN_SIZE;
    this.score += score;
    this.text.text = this.getText();
    this.setPosition(width - this.text.width - 10, 10);
  }

  getText() {
    return `分数: ${Math.floor(this.score / 300)}`;
  }
}

export default Score;