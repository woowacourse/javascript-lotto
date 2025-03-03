import lottoControllerUI from "./controllers/lottoControllerUI.js";
import { $, $$ } from "../src/utils/dom.js";

// /**
//  * step 2의 시작점이 되는 파일입니다.
//  * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
//  */
const init = async () => {
  const lottoController = new lottoControllerUI();

  $(".purchase").addEventListener("submit", (e) => e.preventDefault());

  $(".form__winning-numbers").addEventListener("submit", (e) =>
    e.preventDefault()
  );

  $(".purchase button").addEventListener(
    "click",
    lottoController.handlePurchaseClick
  );

  const inputs = $$(".inputs__winning-number input");
  inputs.forEach((input) => {
    input.addEventListener("input", () =>
      lottoController.handleInputChange(inputs)
    );
  });

  $(".winning-lotto .result").addEventListener("click", () =>
    lottoController.handleResultClick(inputs)
  );

  $(".modal .retry").addEventListener("click", () =>
    lottoController.handleRetryClick(inputs)
  );

  $(".modal .close").addEventListener(
    "click",
    lottoController.handleCloseClick
  );

  $(".overlay").addEventListener("click", lottoController.handleCloseClick);

  $(".modal").addEventListener("click", (e) => e.stopPropagation());
};

init();
