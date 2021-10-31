import * as ui from 'tinyjs-plugin-ui';

class Button extends Tiny.Container {
  constructor() {
    super();
    const stopBtn = new ui.Button({
      background: Tiny.Sprite.fromFrame('tileset-vendor-start.png'),
      active: {
        scale: 1.2,
        callback: (e) => {
          e.stopPropagation();
          this.toggleBtn();
        },
      },
    });

    const continueBtn = new ui.Button({
      background: Tiny.Sprite.fromFrame('tileset-vendor-continue.png'),
      active: {
        scale: 1.2,
        callback: (e) => {
          e.stopPropagation();
          this.toggleBtn();
        },
      },
    });

    this.setPosition(10, 10);
    this.addChild(stopBtn);

    this.stopBtn = stopBtn;
    this.continueBtn = continueBtn;

    this.isPlaying = true;
  }

  toggleBtn() {
    if (this.isPlaying) {
      this.removeChild(this.stopBtn);
      this.addChild(this.continueBtn);
      this.emit('stop');
    } else {
      this.removeChild(this.continueBtn);
      this.addChild(this.stopBtn);
      this.emit('start');
    }
    this.isPlaying = !this.isPlaying;
  }
}

export default Button;
