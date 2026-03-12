/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import loadComponent from "./ui/loadComponent.js";
import { parseStringToNumber } from "./utils/parser";
import { validatePurchaseAmount } from "./utils/validator.js";
import { getPurchaseAmountInput } from "./view/webInputView.js";
import { generateLottos } from "./generateLottos";
import { generateRandomNumbers } from "./generateRandomNumbers.js";
import { renderLottoList, renderPurchaseCount } from "./view/webOutputView";

loadComponent("main", "./src/ui/html/main.html").then(() => {
  const modalContainer = document.getElementById("modal-container");
  const modalCloseButton = document.getElementById("modal-close-button");
  let purchaseAmount = 0;
  let generatedLottos = [];

  // 구입 버튼 눌렀을 때 이벤트
  document
    .querySelector("#purchase-input-section button")
    .addEventListener("click", () => {
      try {
        const amount = parseStringToNumber(getPurchaseAmountInput());
        validatePurchaseAmount(amount);
        purchaseAmount = amount;

        const purchaseCount = amount / 1000;
        generatedLottos = generateLottos(
          Array.from({ length: purchaseCount }, generateRandomNumbers),
        );

        renderPurchaseCount(purchaseCount);
        renderLottoList(generatedLottos);
      } catch (e) {
        alert(e.message);
      }
    });

  // 결과 확인버튼 눌렀을 때 이벤트
  document
    .querySelector("#winning-input-section button")
    .addEventListener("click", () => {
      document.getElementById("modal-container").style.display = "flex";
    });

  // 모달이 열려있을 때 모달 바깥영역을 눌렀을 떄 이벤트
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });

  // 모달이 열려있을 때 X버튼 눌렀을 때 이벤트
  modalCloseButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
});
