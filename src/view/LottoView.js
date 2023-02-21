class LottoView {
  constructor($element) {
    this.$element = $element;
    this.bindInputPriceEvent();
  }

  readEvent(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
  }

  createCustomEvent(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
  }

  reset() {
    this.$element.reset();
    this.$element.focus();
  }

  printErrorMessage($element, message) {
    $element.innerText = `[ERROR] ${message}`;
  }

  bindInputPriceEvent() {
    this.$element.addEventListener('submit', (e) => this.inputPriceHandler(e));
  }

  inputPriceHandler(e) {
    e.preventDefault();
    this.createCustomEvent('inputPrice', e.target.elements.budget.value);
  }
}

export default LottoView;
