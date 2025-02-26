import { qsAll } from "../utils/domHelper";

export default class Component {
  constructor(element, props = {}) {
    this.element = element;
    this.props = { ...props };

    if (!element) throw "no element";
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
    const children = [...qsAll(selector, callback)];
    const isTarget = (element) =>
      children.includes(element) || element.closest(selector);

    element.addEventListner(eventType, (event) => {
      if (isTarget(event.target)) callback(event);
    });
  }
}
