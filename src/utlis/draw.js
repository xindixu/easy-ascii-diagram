/* eslint-disable no-case-declarations */
const drawRect = (ctx, x, y, width, height) => {
  console.log(x);
  ctx.fillRect(x, y, width, height);
};


export default function draw(ctx, type, props) {
  switch (type) {
    case 'rect':
      const {
        x, y, width, height,
      } = props;
      try {
        drawRect(ctx, x, y, width, height);
      } catch (error) {
        console.error(error);
      }
      break;
    case 'line':
      break;

    case 'arrow':
      break;

    case 'text':

      break;

    default:
      break;
  }
}
