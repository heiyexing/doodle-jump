import { CHARACTOR_WIDTH, CHARACTOR_HEIGHT } from '../config';
import { capitalize } from 'lodash';

class Role extends Tiny.Container {
  constructor() {
    super();

    const rightRole = this.initRole('right');
    const leftRole = this.initRole('left');
    this.direction = 'right';
    this.role = rightRole;
    this.leftRole = leftRole;
    this.rightRole = rightRole;

    this.addChild(rightRole);
  }

  initRole(direction = 'right') {
    // 初始化主角
    const role = Tiny.Sprite.fromImage(this.getRoleImage(direction));
    role.width = CHARACTOR_WIDTH;
    role.height = CHARACTOR_HEIGHT;
    return role;
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

  getRoleImage(direction = 'right') {
    return Tiny.resources[`role${capitalize(direction)}PNG`];
  }
}

export default Role;
