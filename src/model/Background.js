const BLOCK_SIZE = 200;

class Background extends Tiny.Container {
  constructor() {
    super();

    const { width, height } = Tiny.WIN_SIZE;

    this.setPosition(0, 0);
    this.setPivot(0, 0);

    this.width = width;
    this.height = height;

    for (let j = 0; j < height / BLOCK_SIZE; j++) {
      for (let i = 0; i < width / BLOCK_SIZE; i++) {
        const image = Tiny.Sprite.fromImage(Tiny.resources['backgroundPNG']);
        image.width = BLOCK_SIZE;
        image.height = BLOCK_SIZE;
        image.setPosition(i * BLOCK_SIZE, j * BLOCK_SIZE);
        this.addChild(image);
      }
    }
  }
}

export default Background;
