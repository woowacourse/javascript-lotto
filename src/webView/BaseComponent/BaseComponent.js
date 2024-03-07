class BaseComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }
  render() {}
  setEvent() {}
  on({ target, eventName }, eventListener) {
    document.querySelector(target).addEventListener(eventName, eventListener);
  }
}

export default BaseComponent;
