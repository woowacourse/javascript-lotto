const DomSelector = {
  lottoGame: document.querySelector("#lottoGame"),
  purchaseAmount: document.querySelector(".purchase_amount"),
  purchaseAmountInput: document.querySelector("#purchaseAmountInput"),

  purchaseCount: document.querySelector(".purchase_count"),
  lottoPack: document.querySelector(".lotto_pack"),

  answerLottoSection: document.querySelector(".answer_lotto_section"),
  answerLotto: document.querySelector(".answer_lotto"),

  winningNumbers: document.querySelectorAll(".winning_number"),
  bonusNumber: document.querySelector(".bonus_number"),

  lottoResultModal: document.querySelector(".lotto_result_modal"),
  errorModal: document.querySelector(".error_modal"),

  lottoResult: document.getElementById("lottoResult"),
  statistics: document.querySelector(".statistics"),
  statisticsRows: document.querySelectorAll(".statistics .row"),
  profitRate: document.querySelector(".profit_rate"),
  restartButton: document.querySelector("#restartButton"),
};

export default DomSelector;
