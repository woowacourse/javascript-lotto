export default class Nav {
  constructor($target) {
    this.render($target);
  }

  render($target) {
    const $nav = document.createElement("nav");
    const $title = document.createElement("h1");

    $title.innerHTML = "🎱 행운의 로또";
    $title.className = "title";
    $nav.className = "nav";

    $nav.appendChild($title);
    $target.appendChild($nav);
  }
}
