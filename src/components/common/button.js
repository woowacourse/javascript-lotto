import customCreateElement from "../../utils/customElement.js";

export default class Button {
  constructor($target, onClick, text, type = "button") {
    this.render($target, onClick, text, type);
  }

  render($target, onClick, text, type) {
    const $button = customCreateElement({
      tagName: "button",
      className: "full-button",
      text,
    });
    $button.type = type;

    $button.addEventListener("click", onClick);
    $target.appendChild($button);
  }
}
