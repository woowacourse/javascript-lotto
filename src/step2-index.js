import { parseStringToNumber } from "./utils/parser.js";
import { generateRandomNumbers } from "./generateRandomNumbers.js";
import WebLottoManager from "./WebLottoManager.js";
import { dom } from "./view/ui/dom.js";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const webLottoManager = new WebLottoManager(generateRandomNumbers);

const resetDOM = () => {
  dom.purchasedLottoSection.innerHTML = "";
  dom.winningSection.classList.add("hidden");
  dom.modalOverlay.classList.add("hidden");
  dom.purchaseInput.value = "";
};

dom.purchaseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dom.winningSection.classList.remove("hidden");
  const amount = parseStringToNumber(dom.purchaseInput.value);

  const { count, lottos } = webLottoManager.purchase(amount);
  dom.purchasedLottoSection.innerHTML = `
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

dom.resultBtn.addEventListener("click", () => {
  const winningNumbers = [...dom.winningNumberInputs].map((input) =>
    parseStringToNumber(input.value)
  );
  const bonusNumber = parseStringToNumber(dom.bonusNumberInput.value);

  const { prizeList, roi } = webLottoManager.getResult(
    winningNumbers,
    bonusNumber
  );
  [1, 2, 3, 4, 5].forEach((rank) => {
    dom.stats[rank].textContent = `${prizeList[rank]}개`;
  });
  dom.roiText.textContent = `당신의 총 수익률은 ${roi}%입니다.`;
  dom.modalOverlay.classList.remove("hidden");
});

dom.restartBtn.addEventListener("click", () => {
  webLottoManager.reset();
  resetDOM();
});
