import lottoControllerUI from "./controllers/lottoControllerUI.js";

// /**
//  * step 2의 시작점이 되는 파일입니다.
//  * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
//  */
const init = async () => {
  const lottoController = new lottoControllerUI();

  document
    .querySelector(".purchase button")
    .addEventListener("click", lottoController.handlePurchaseClick);

  const inputs = document.querySelectorAll(".inputs__winning-number input");
  inputs.forEach((input) => {
    input.addEventListener("input", () =>
      lottoController.handleInputChange(inputs)
    );
  });

  document
    .querySelector(".winning-lotto .result")
    .addEventListener("click", lottoController.handleResultClick);

  document
    .querySelector(".modal .retry")
    .addEventListener("click", lottoController.handleRetryClick);

  document
    .querySelector(".modal .close")
    .addEventListener("click", lottoController.handleCloseClick);
};

init();
