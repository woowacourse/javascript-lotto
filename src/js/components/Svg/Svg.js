export default class Svg {
  constructor(shape) {
    this.shape = shape;
  }

  mainTemplate() {
    switch (this.shape) {
      case 'x':
        return `<svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>`;
      case '+':
        return `<svg width="100" height="100">
            <line class="add-icon" x1="0" y1="50" x2="100" y2="50"/>
            <line class="add-icon" x1="50" y1="0" x2="50" y2="100"/>
        </svg>`;
      default:
        return ``;
    }
  }
}
