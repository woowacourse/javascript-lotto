import Nav from "./components/layout/Nav.js";
import Footer from "./components/layout/Footer.js";
import LottoGame from "./components/LottoGame.js";
import customCreateElement from "./utils/customElement.js";
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

class App {
  constructor() {
    this.render();
  }

  render() {
    const $body = document.querySelector("body");
    const $container = customCreateElement({
      tagName: "section",
      className: "container",
    });

    new Nav($body);
    $body.appendChild($container);

    new LottoGame($container);
    new Footer($body);
  }
}

new App();
