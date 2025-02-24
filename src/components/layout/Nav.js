export default class Nav {
  constructor() {
    this.render();
  }

  render() {
    const $body = document.querySelector("body");
    const $nav = document.createElement("nav");
    const $title = document.createElement("h1");

    $title.innerHTML = "🎱 행운의 로또";
    $title.className = "title";
    $nav.className = "nav";

    $nav.appendChild($title);
    $body.appendChild($nav);
  }
}
