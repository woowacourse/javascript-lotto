export default class Button {
  constructor($target, onClick, text) {
    this.render($target, onClick, text);
  }

  render($target, onClick, text) {
    const $button = document.createElement("button");
    $button.innerText = text;
    $button.className = "full-button";
    $button.type = "button";

    $button.addEventListener("click", onClick);
    $target.appendChild($button);
  }
}
