import { dom } from "./dom.js";

export const renderPurchaseLottos = (count, lottos) => {
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
  dom.winningSection.classList.remove("hidden");
};

export const renderResultModal = (prizeList, roi) => {
  [1, 2, 3, 4, 5].forEach((rank) => {
    dom.stats[rank].textContent = `${prizeList[rank]}개`;
  });
  dom.roiText.textContent = `당신의 총 수익률은 ${roi}%입니다.`;
  dom.modalOverlay.classList.remove("hidden");
};

export const resetDOM = () => {
  dom.purchasedLottoSection.innerHTML = "";
  dom.winningSection.classList.add("hidden");
  dom.modalOverlay.classList.add("hidden");
  dom.purchaseInput.value = "";
  dom.winningNumberInputs.forEach((input) => (input.value = ""));
  dom.bonusNumberInput.value = "";
};
