const showWinningSection = (visible) => {
  const winningSection = document.querySelector("section.winning-section");
  winningSection.hidden = !visible;
};

const showLottoSection = (visible) => {
  const lottoSection = document.querySelector("section.lotto-section");
  lottoSection.hidden = !visible;
};

const resetPurchaseForm = () => {
  const purchaseForm = document.querySelector("form.purchase-form");
  purchaseForm.reset();
};

const resetWinningForm = () => {
  const winningForm = document.querySelector("form.winning-form");
  winningForm.reset();
};

const disablePurchaseForm = (disabled) => {
  const purchaseFormFieldset = document.querySelector(
    "form.purchase-form > fieldset",
  );
  purchaseFormFieldset.disabled = disabled;
};

const showModalOverlay = (visible) => {
  const modalOverlay = document.querySelector("div.modal-overlay");
  modalOverlay.hidden = !visible;
};

export {
  showWinningSection,
  showLottoSection,
  resetPurchaseForm,
  resetWinningForm,
  disablePurchaseForm,
  showModalOverlay,
};
