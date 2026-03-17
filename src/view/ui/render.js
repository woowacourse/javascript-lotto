import { dom } from "./dom.js";

export const renderPurchaseLottos = (count, lottos) => {
  dom.purchasedLottoSection.innerHTML = `
  <p class="body-text">총 ${count}개를 구매하였습니다.</p>
  <div class='lotto-numbers-container'>
  ${lottos
    .map(
      (lotto) =>
        `<p class='lotto-number-line'><span class='lotto-emoji'>🎟️</span><span class='lotto-numbers'>${lotto}</span></p>`
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

export const resetPurchaseSection = () => {
  dom.purchaseInput.value = "";
  dom.purchasedLottoSection.innerHTML = "";
};

export const resetWinningSection = () => {
  dom.winningSection.classList.add("hidden");
  dom.winningNumberInputs.forEach((input) => (input.value = ""));
  dom.bonusNumberInput.value = "";
};

export const resetModal = () => {
  modalHiddenByBtn();
};

export const resetDOM = () => {
  resetPurchaseSection();
  resetWinningSection();
  resetModal();
};

export const renderErrorMessage = (errorEle, errorMsg) => {
  errorEle.textContent = errorMsg;
};

export const removeErrorMessage = (errorEle) => {
  errorEle.textContent = "";
};

export const modalHiddenByBtn = () => {
  dom.modalOverlay.classList.add("hidden");
};

export const modalHiddenByOverlay = (e) => {
  if (e.target === dom.modalOverlay) {
    dom.modalOverlay.classList.add("hidden");
  }
};
