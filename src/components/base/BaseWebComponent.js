class BaseWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return "";
  }

  setEvent() {}
  removeEvent() {}

  emit(eventType, detail) {
    const customEvent = new CustomEvent(eventType, {
      bubbles: true,
      detail,
    });

    this.dispatchEvent(customEvent);
  }

  on({ target, eventType }, eventListener) {
    target.addEventListener(eventType, eventListener);
  }

  off({ target, eventType }, eventListener) {
    target.removeEventListener(eventType, eventListener);
  }
}

export default BaseWebComponent;
