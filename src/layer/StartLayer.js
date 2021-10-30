import BackgroundModel from '../model/BackgroundModel';
import CharactorModel from '../model/CharactorModel';

class StartLayer extends Tiny.Container {
  constructor() {
    super();

    // const { width, height } = Tiny.WIN_SIZE;
    // // 蜜蜂
    // const charactor = new Tiny.AnimatedSprite([
    //   Tiny.Texture.fromFrame('tileset-charactor-1.png'),
    //   Tiny.Texture.fromFrame('tileset-charactor-2.png'),
    // ]);
    // charactor.animationSpeed = 0.05;
    // charactor.setAnchor(0.5);
    // charactor.setPosition(width / 2, height / 2);
    // charactor.play();
    //
    // this.addChild(charactor);
    const backgroundModel = new BackgroundModel();
    const charactorModel = new CharactorModel();

    this.addChild(backgroundModel, charactorModel);
  }
}

export default StartLayer;
