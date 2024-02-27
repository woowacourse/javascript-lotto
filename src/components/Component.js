class Component extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventHandler();
  }

  render() {}

  attributeChangedCallback() {}

  setEventHandler() {}
}

export default Component;
