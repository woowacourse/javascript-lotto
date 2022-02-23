class Component extends HTMLElement {
  connectedCallback() {
    this.render();
    this.subscribe();
    this.setEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return '';
  }

  subscribe() {
    window.store.subscribe(this);
  }

  setEvent() {}

  addEvent(eventType, selector, callback) {
    const children = [...this.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    this.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) {
        return false;
      }
      return callback(event);
    });
  }

  notify() {
    this.render();
  }
}

export default Component;
