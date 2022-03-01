import Calculator from '../EventListener/Calculator.js';

export default class LottoCountCalcultor extends Calculator {
  constructor(value) {
    super();
    this.value = value;
  }

  execute() {
    return Math.floor(this.value / this.unit);
  }
}
