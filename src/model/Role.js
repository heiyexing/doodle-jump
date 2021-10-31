import {
  ROLE_WIDTH,
  ROLE_HEIGHT,
  ROLE_FOOT_X_RANGE,
  ROLE_FOOT_Y_RANGE,
} from '../config';
import { capitalize } from 'lodash';

class Role extends Tiny.Container {
  constructor() {
    super();
    const { width, height } = Tiny.WIN_SIZE;

    const rightRole = this.initRole('right');
    const leftRole = this.initRole('left');
    const foot = this.initFoot();

    this.direction = 'right';
    this.role = rightRole;
    this.foot = foot;

    this.leftRole = leftRole;
    this.rightRole = rightRole;

    this.addChild(rightRole, foot);
    this.setPosition((width - ROLE_WIDTH) / 2, (height - ROLE_HEIGHT) / 2);
  }

  initRole(direction = 'right') {
    // 初始化主角
    const role = Tiny.Sprite.fromImage(this.getRoleImage(direction));
    role.width = ROLE_WIDTH;
    role.height = ROLE_HEIGHT;
    return role;
  }

  initFoot() {
    // eslint-disable-next-line new-cap
    const foot = new Tiny.Sprite.fromImage(this.getRoleImage('right'));
    foot.width = ROLE_FOOT_X_RANGE[1] - ROLE_FOOT_X_RANGE[0];
    foot.height = ROLE_FOOT_Y_RANGE[1] - ROLE_FOOT_Y_RANGE[0];
    foot.setPosition(ROLE_FOOT_X_RANGE[0], ROLE_FOOT_Y_RANGE[0]);
    return foot;
  }

  faceDirection(direction) {
    if (direction !== this.direction) {
      this.removeChild(this.role);
      if (direction === 'right') {
        this.role = this.rightRole;
        this.addChild(this.rightRole);
      } else {
        this.role = this.leftRole;
        this.addChild(this.leftRole);
      }
      this.direction = direction;
    }
  }

  isKnock(sprite) {
    const { x: footX, y: footY, width: footWidth, height: footHeight } = this.foot.getBounds();
    const { x: spriteX, y: spriteY, width: spriteWidth, height: spriteHeight } = sprite.getBounds();
    const footRect = new Tiny.Rectangle(footX, footY, footWidth, footHeight);
    const spirteRect = new Tiny.Rectangle(spriteX, spriteY, spriteWidth, spriteHeight);
    return Tiny.rectIntersectsRect(footRect, spirteRect);
  }

  getRoleImage(direction = 'right') {
    return Tiny.resources[`role${capitalize(direction)}PNG`];
  }
}

export default Role;
