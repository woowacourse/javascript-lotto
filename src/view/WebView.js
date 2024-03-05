import { $, $$ } from "../utils/querySelector.js";

const WebView = {
  /**
   * after-budget 영역 조절
   */
  handleAfterBudget() {
    $("#after-budget-invisible").id = "after-budget";
    const form = document.querySelector("#content-box-input-budget");
    const formInputs = form.querySelectorAll("input, button");

    formInputs.forEach((input) => {
      input.disabled = true;
    });
  },

  printWebIssuedLottoCount(webIssuedLottoCount) {
    $("#issued-lotto-count").innerHTML = webIssuedLottoCount;
    return;
  },

  printWebIssuedLottoArray(webIssuedLottoArray) {
    const curr = $("#content-box-lottos-msg");

    webIssuedLottoArray.forEach((array) => {
      const lottoImoji = Object.assign(document.createElement("div"), {
        innerHTML: "🎟️",
        id: "lotto-imoji",
      });

      const issuedLottoDiv = Object.assign(document.createElement("div"), {
        innerHTML: array.join(", "),
        className: "lotto-body",
        id: "issued-lotto-div",
      });

      const issuedLotto = document.createElement("div");
      issuedLotto.id = "issued-lotto";
      issuedLotto.append(lottoImoji, issuedLottoDiv);

      curr.append(issuedLotto);
    });
  },

  openModal() {
    $("#modal").style.display = "flex";
  },

  closeModal() {
    $("#modal").style.display = "none";
  },

  closeModalOutside(event) {
    if (event.target.id === "modal") {
      this.closeModal();
    }
  },

  removeWebIssuedLottoArray() {
    const issuedLottos = $$("#issued-lotto");
    issuedLottos.forEach((lotto) => lotto.remove());
  },

  removeWebWinningCombinationInput() {
    $$(".lotto-numbers-input").forEach((input) => (input.value = ""));
    $(".lotto-bonus-input").value = "";
  },

  reloadTag() {
    this.removeWebIssuedLottoArray();
    this.removeWebWinningCombinationInput();
    $("#budget").value = "";
    $("#after-budget").id = "after-budget-invisible";
    const form = document.querySelector("#content-box-input-budget");
    const formInputs = form.querySelectorAll("#budget, .lotto-caption");

    formInputs.forEach((input) => {
      input.disabled = false;
    });

    this.closeModal();
  },

  printWebWinningCombinationMessage(message) {
    $("#lotto-input-error").innerHTML = message;
  },

  printWebRankResult(webRankResult) {
    Object.keys(webRankResult).forEach((rank) => {
      $(`#lotto-rank-${rank}`).innerHTML = webRankResult[rank];
    });
  },

  printWebProfit(webProfit) {
    $("#profit-msg-num").innerHTML = webProfit.toFixed(0);
  },
};

export default WebView;
