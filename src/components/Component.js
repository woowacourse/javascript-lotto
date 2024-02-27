class Component extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEventHandler();
  }

  disconnectedCallback() {}

  render() {}

  attributeChangedCallback() {}

  setEventHandler() {}
}

export default Component;
