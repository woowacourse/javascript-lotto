export default class Footer {
  constructor($target) {
    this.render($target);
  }

  render($target) {
    const $footer = document.createElement("footer");
    const $text = document.createElement("p");

    $footer.className = "footer";
    $text.className = "footer-text";
    $text.innerText = "Copyright 2023. woowacourse";

    $footer.appendChild($text);
    $target.appendChild($footer);
  }
}
