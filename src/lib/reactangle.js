import Base from './base';

class Rectangle extends Base {
  constructor(x, y, width, height) {
    super(x, y, width, height, null);
    this.charSet = {
      corner: '+',
      horizontalEdge: '-',
      verticalEdge: '|',
      inner: ' ',
    };
  }

  toString() {
    let text = '';
    for (let j = 0; j < this.height; j += 1) {
      for (let i = 0; i < this.width; i += 1) {
        if ((i === 0 || i === this.width - 1) && (j === 0 || j === this.height - 1)) {
          text += this.charSet.corner;
        } else if ((i > 0 && i < this.width - 1) && (j === 0 || j === this.height - 1)) {
          text += this.charSet.horizontalEdge;
        } else if ((i === 0 || i === this.width - 1) && (j > 0 && j < this.height - 1)) {
          text += this.charSet.verticalEdge;
        } else {
          text += this.charSet.inner;
        }
      }
      text += '\n';
    }
    return text;
  }
}

export default Rectangle;
