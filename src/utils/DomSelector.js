const DomSelector = {
  purchaseAmount: document.querySelector("#purchaseAmount"),
  purchaseButton: document.querySelector("#purchaseButton"),

  lottoPackSection: document.querySelector(".lotto_pack_section"),
  purchaseCount: document.querySelector(".purchase_count"),
  lottoPack: document.querySelector(".lotto_pack"),

  answerLottoSection: document.querySelector(".answer_lotto_section"),
  reusltButton: document.querySelector(".reuslt_button_section #resultButton"),
  winningNumbers: document.querySelectorAll(".winning_number"),
  bonusNumber: document.querySelector(".bonus_number"),

  lottoResultModal: document.querySelector(".lotto_result_modal"),

  lottoResult: document.getElementById("lottoResult"),
  statistics: document.querySelector(".statistics"),
  statisticsRows: document.querySelectorAll(".statistics .row"),
  profitRate: document.querySelector(".profit_rate"),
  restartButton: document.querySelector("#restartButton"),
};

export default DomSelector;
