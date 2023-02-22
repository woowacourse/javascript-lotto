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

  reset() {
    this.$element.reset();
    this.$element.focus();
  }

  print($element, content) {
    $element.innerText = content;
  }
}

export default LottoView;
