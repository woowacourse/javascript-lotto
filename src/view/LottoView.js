class LottoView {
  constructor($element) {
    this.$element = $element;
  }

  readEvent(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
  }

  createCustomEvent(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
  }

  print($element, content) {
    $element.innerText = content;
  }

  resetInput() {
    this.$element.reset();
    this.$element.focus();
  }

  resetPrint($element) {
    $element.innerText = '';
  }
}

export default LottoView;
