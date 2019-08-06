class Base {
  constructor(x, y, width, height, direction) {
    this.name = 'base';
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.direction = direction;
    this.charSet = {};
  }

  toString() {}

  draw() {}
}

export default Base;
