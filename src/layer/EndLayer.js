import * as ui from 'tinyjs-plugin-ui';
import StartLayer from './StartLayer';
import Background from '../model/Background';

class EndLayer extends Tiny.Container {
  constructor() {
    super();

    const { width, height } = Tiny.WIN_SIZE;

    // Logo
    this.logo = Tiny.Sprite.fromImage(Tiny.resources.logoEndPNG);
    this.logo.setAnchor(0.5, 0.5);
    this.logo.setPosition(width / 2, height / 2);

    var gameOver = new Tiny.BitmapText('Game Over!', {
      font: '40px font',
      tint: '0x5a5816',
    });
    gameOver.setPosition(30, 130);
    gameOver.rotation = -3.14 / 7;

    // 结束按钮
    const endBtn = new ui.Button({
      background: Tiny.Sprite.fromFrame('tileset-vendor-start.png'),
      active: {
        scale: 1.4,
        callback: this.onReady,
      },
    });
    endBtn.setPivot(endBtn.width / 2, endBtn.height / 2);
    endBtn.setPosition(width / 2, height - 260);

    const background = new Background();

    this.addChild(background, this.logo, endBtn, gameOver);
  }

  onReady() {
    Tiny.app.replaceScene(new StartLayer(), 'FadeColor', 300);
  }
}

export default EndLayer;
