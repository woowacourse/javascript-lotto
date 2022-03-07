import Calculator from '../EventListener/Calculator.js';

export default class RemainFareCalculator extends Calculator {
  constructor(value) {
    super();
    this.value = value;
  }

  execute() {
    return this.value % this.unit;
  }
}
