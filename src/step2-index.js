import Modal from "./common/Modal.js";
import Nav from "./components/layout/Nav.js";
import LottoGame from "./components/LottoGame.js";
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
    new Nav();

    const $container = document.createElement("div");
    $container.classList = "container";
    $body.appendChild($container);

    new LottoGame($container);
    new Modal($body);
  }
}

new App();
