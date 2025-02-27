import customCreateElement from "../../utils/customElement.js";

export default class Button {
  constructor($target, onClick, text) {
    this.render($target, onClick, text);
  }

  render($target, onClick, text) {
    const $button = customCreateElement({
      tagName: "button",
      className: "full-button",
      text,
    });
    $button.type = "button";

    $button.addEventListener("click", onClick);
    $target.appendChild($button);
  }
}
