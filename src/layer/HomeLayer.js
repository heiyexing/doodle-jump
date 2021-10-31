import * as ui from 'tinyjs-plugin-ui';
import StartLayer from './StartLayer';
import Background from '../model/Background';

class HomeLayer extends Tiny.Container {
  constructor() {
    super();

    const { width, height } = Tiny.WIN_SIZE;

    // Logo
    this.logo = Tiny.Sprite.fromImage(Tiny.resources.logoJPG);
    this.logo.setAnchor(0.5, 0.5);
    this.logo.setPosition(width / 2, height / 2);

    // 开始按钮
    const startBtn = new ui.Button({
      background: Tiny.Sprite.fromFrame('tileset-vendor-start.png'),
      active: {
        scale: 1.4,
        callback: this.onReady,
      },
    });
    startBtn.setPivot(startBtn.width / 2, startBtn.height / 2);
    startBtn.setPosition(width / 2, height - 260);

    const background = new Background();

    this.addChild(background, this.logo, startBtn);
  }

  onReady() {
    Tiny.app.replaceScene(new StartLayer(), 'FadeColor', 300);
  }
}

export default HomeLayer;
