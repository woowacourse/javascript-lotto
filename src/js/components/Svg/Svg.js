export default class Svg {
  constructor(shape) {
    this.shape = shape;
  }

  getTemplate() {
    switch (this.shape) {
      case 'x':
        return `<svg viewbox="0 0 40 40">
                  <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>`;
      case '+':
        return `<svg width="16" height="16">
                  <line class="plus-icon" x1="0" y1="8" x2="16" y2="8"/>
                  <line class="plus-icon" x1="8" y1="0" x2="8" y2="16"/>
              </svg>`;
      default:
        return ``;
    }
  }
}
