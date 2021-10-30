class StartLayer extends Tiny.Container {
  constructor() {
    super();

    const { width, height } = Tiny.WIN_SIZE;
    // 蜜蜂
    const hero = new Tiny.AnimatedSprite([
      Tiny.Texture.fromFrame('tileset-hero-1.png'),
      Tiny.Texture.fromFrame('tileset-hero-2.png'),
    ]);
    hero.animationSpeed = 0.05;
    hero.setAnchor(0.5);
    hero.setPosition(width / 2, height / 2);
    hero.play();

    this.addChild(hero);
  }
}

export default StartLayer;
