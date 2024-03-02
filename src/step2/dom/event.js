import { ELEMENT_SELECTOR } from "../constants/lotto";

export const registerPurchaseEvent = (purchaseCallback) => {
  const lottoPurchaseForm = document.getElementById(
    ELEMENT_SELECTOR.purchaseForm,
  );
  const lottoPurchaseInput = document.getElementById(
    ELEMENT_SELECTOR.purchaseInput,
  );

  lottoPurchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    purchaseCallback(lottoPurchaseInput.value);
  });
};

const getWinningLottoNumbers = () => {
  const winningLottoInputs = document.querySelectorAll(
    ELEMENT_SELECTOR.winningLottoInput,
  );

  return [...winningLottoInputs].map((winningNumber) => {
    return winningNumber.value;
  });
};

const getBonusNumber = () => {
  const bonusNumber = document.getElementById(
    ELEMENT_SELECTOR.bonusNumberInput,
  );

  return bonusNumber.value;
};

export const registerRenderResultEvent = (renderResultCallback) => {
  const winningLottoForm = document.getElementById(
    ELEMENT_SELECTOR.winningLottoForm,
  );

  winningLottoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const winningNumbers = getWinningLottoNumbers();
    const bonusNumber = getBonusNumber();
    renderResultCallback(winningNumbers, bonusNumber);
  });
};

export const registerCloseModalEvent = (closeCallback) => {
  const modalBackground = document.getElementById(
    ELEMENT_SELECTOR.modalBackground,
  );
  const modalCancelButton = document.getElementById(
    ELEMENT_SELECTOR.modalCancelButton,
  );

  modalCancelButton.addEventListener("click", () => {
    closeCallback();
  });

  modalBackground.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      closeCallback();
    }
  });
};

export const registerRestartEvent = (restartCallback) => {
  const restartButton = document.getElementById(ELEMENT_SELECTOR.restartButton);

  restartButton.addEventListener("click", () => {
    restartCallback();
  });
};
