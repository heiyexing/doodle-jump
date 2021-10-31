class Message extends Tiny.Container {
  constructor() {
    super();
    const { width, height } = Tiny.WIN_SIZE;

    const action = Tiny.FadeOut(500);

    // eslint-disable-next-line new-cap
    const message = new Tiny.Sprite.fromImage('tileset-vendor-start.png');
    message.width = 300;
    message.height = 150;

    action.onComplete = () => {
      this.removeChild(message);
      this.emit('start');
    };

    message.runAction(action);

    this.setPosition(
      (width - message.width) / 2,
      (height - message.height) / 2
    );

    this.addChild(message);
  }
}

export default Message;
