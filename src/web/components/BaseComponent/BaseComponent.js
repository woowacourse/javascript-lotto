class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  disconnectedCallback() {}

  render() {}

  setEvent() {}

  emit(eventType, detail) {
    const customEvent = new CustomEvent(eventType, {
      bubbles: true,
      detail,
    });

    this.dispatchEvent(customEvent);
  }

  on({ target, eventName }, eventHandler) {
    target.addEventListener(eventName, eventHandler);
  }

  off({ target, eventName, eventHandler }) {
    target.removeEventListener(eventName, eventHandler);
  }
}

export default BaseComponent;
