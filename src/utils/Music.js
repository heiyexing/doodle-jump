const MUSIC_MAP = {
  jump: 'res/sounds/jump.mp3',
};

class Music {
  constructor() {
    this.audio = new Audio(MUSIC_MAP.jump);
  }

  play(type) {
    const url = MUSIC_MAP[type];
    if (url) {
      this.audio.src = url;
      this.audio.play();
    }
  }
}

export default Music;
