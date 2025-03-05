import customCreateElement from "../../utils/customElement.js";

export default class Button {
  constructor(onClick, text, type = "button") {
    this.$button = customCreateElement({
      tagName: "button",
      className: "full-button",
      text,
    });
    this.$button.type = type;
    this.$button.addEventListener("click", onClick);
  }

  render() {
    return this.$button;
  }
}
