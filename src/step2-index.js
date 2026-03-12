import { parseStringToNumber } from "./utils/parser.js";
import { generateRandomNumbers } from "./generateRandomNumbers.js";
import WebLottoManager from "./WebLottoManager.js";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const purchaseBtn = document.getElementById("purchase-amount-button");
const purchaseInput = document.getElementById("purchase-amount-input");
const purchasedLottoSection = document.getElementById(
  "purchased-lotto-section"
);

const webLottoManager = new WebLottoManager(generateRandomNumbers);

purchaseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = parseStringToNumber(purchaseInput.value);

  const { count, lottos } = webLottoManager.purchase(amount);
  purchasedLottoSection.innerHTML = `
  <p>총 ${count}개를 구매하였습니다.</p>
  <div class='lotto-numbers-container'>
  ${lottos
    .map(
      (lotto) =>
        `<p class='lotto-number-line'><span class='lotto-emoji'>🎟️</span><span class='lotto-numbers'>${lotto
          .getNumbers()
          .join(", ")}</span></p>`
    )
    .join("")}
  </div>`;
});
