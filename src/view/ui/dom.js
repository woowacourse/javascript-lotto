export const dom = {
  purchaseBtn: document.getElementById("purchase-amount-button"),
  purchaseInput: document.getElementById("purchase-amount-input"),
  purchasedLottoSection: document.getElementById("purchased-lotto-section"),
  winningSection: document.getElementById("winning-section"),
  winningNumberInputs: document.querySelectorAll(
    ".winning-number-input-container .number-each"
  ),
  bonusNumberInput: document.getElementById("bonus-number"),
  resultBtn: document.getElementById("result-btn"),
  modalOverlay: document.getElementById("modal-overlay"),
  restartBtn: document.getElementById("restart-btn"),
  stats: {
    1: document.getElementById("stat-1"),
    2: document.getElementById("stat-2"),
    3: document.getElementById("stat-3"),
    4: document.getElementById("stat-4"),
    5: document.getElementById("stat-5"),
  },
  roiText: document.getElementById("roi-text"),
  purchaseError: document.getElementById("purchase-error"),
  winningError: document.getElementById("winning-error"),
};
