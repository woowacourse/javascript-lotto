export const ERROR_MESSAGES = {
  invalidNumbersType: "로또 번호는 1~45 사이의 숫자여야 합니다.",
  invalidLottoLength: "로또 번호는 6개여야 합니다.",
  invalidLottoUniqueness: "로또 번호는 중복될 수 없습니다.",
  invalidPurchaseAmount: "구입 금액은 1000단위의 숫자여야 합니다.",
  invalidBonusNumberType: "보너스 번호는 1~45 사이의 숫자여야 합니다.",
  invalidBonusNumberUniqueness: "보너스 번호는 로또 번호와 중복될 수 없습니다.",
  invalidRetrySign: "재시작 신호는 y또는 n이어야 합니다.",
};

export const LOTTO_RULES = {
  price: 1000,
  length: 6,
  minRandomNumber: 1,
  maxRandomNumber: 45,
  scrollThreadhold: 5,
};

export const ELEMENT_SELECTOR = {
  purchaseForm: "lotto-purchase-form",
  purchaseInput: "lotto-purchase-input",
  purchasedLottoContainer: "purchased-lottos-container",
  winningLottoForm: "winning-lotto-form",
  winningLottoContainer: "winning-lotto-input-container",
  winningLottoInput: ".winning-lotto-input",
  bonusNumberContainer: "bonus-number-input-container",
  bonusNumberInput: "bonus-number-input",
  modalBackground: "winning-result-modal-background",
  modalCancelButton: "modal-cancel",
  restartButton: "restart-button",
  winningResultContent: "winning-result-content",
  returnRateContainer: "return-rate-container",
};
