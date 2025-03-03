/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import App from "./app.js";

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  const purchaseButton = document.querySelector(".purchase-button");
  const resultButton = document.querySelector(".result-button");

  if (purchaseButton) {
    purchaseButton.addEventListener("click", () => {
      app.run();
    });
  }

  if (resultButton) {
    resultButton.addEventListener("click", () => {
      document.querySelector(".modal").style.display = "flex";
    });
  }

  const closeButton = document.querySelector(".modal-close-button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.querySelector(".modal").style.display = "none";
    });
  }
});
