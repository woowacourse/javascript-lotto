/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import loadComponent from "./ui/loadComponent.js";
import { playLottoGameWeb } from "./playLottoGameWeb.js";

const BASE_URL = import.meta.env.BASE_URL;

loadComponent("main", `${BASE_URL}src/ui/html/main.html`).then(() => {
  document.querySelector("#modal-close-button img").src =
    `${BASE_URL}close-button.svg`;
  playLottoGameWeb();
});
