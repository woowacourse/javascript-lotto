class Component extends HTMLElement {
  constructor() {
    if (new.target === Component) {
      throw new TypeError('Cannot create an instance of an Component class');
    }
    super();
  }

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

  hide() {
    this.setAttribute('hidden', true);
  }

  show() {
    this.removeAttribute('hidden');
  }
}

export default Component;
