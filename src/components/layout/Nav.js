import customCreateElement from "../../utils/customElement.js";

export default class Nav {
  constructor($target) {
    this.render($target);
  }

  render($target) {
    const $nav = customCreateElement({
      tagName: "nav",
      className: "nav",
    });
    const $title = customCreateElement({
      tagName: "h1",
      className: "title",
      text: "🎱 행운의 로또",
    });

    $nav.appendChild($title);
    $target.appendChild($nav);
  }
}
