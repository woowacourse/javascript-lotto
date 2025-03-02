import { qsAll } from "../../utils/domHelper.js";

export default class Component {
  constructor(element, props = {}) {
    if (!element) throw "no element";
    this.element = element;
    this.props = { ...props };

    this.setUp();
    this.setEvent();
    this.render();
  }

  setEvent() {}

  setUp() {}

  render() {
    this.element.innerHTML = this.template();
    this.mounted();
  }

  template() {
    return "";
  }

  mounted() {}

  addEvent(eventType, selector, callback, element = this.element) {
    const children = [...qsAll(selector, element)];
    const isTarget = (element) =>
      children.includes(element) || element.closest(selector);

    element.addEventListener(eventType, (event) => {
      if (isTarget(event.target)) callback(event);
    });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
