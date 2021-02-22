export default class View {
  constructor($element) {
    // TODO : throw 하게 되면 console이 어떻게 될까
    if (!$element) throw $element;
    this.$element = $element;
    return this;
  }

  show() {
    this.$element.style.display = 'block';
    return this;
  }

  hide() {
    this.$element.style.display = 'none';
    return this;
  }

  on(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
    return this;
  }

  emit(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
    return this;
  }
}
