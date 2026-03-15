export const DOMOutput = {
  printPurchaseLottoCount(count) {
    document.querySelector("#purchase-amount-output").textContent =
      `총 ${count}개를 구매하였습니다.`;
  },

  lottoToHTML(lotto) {
    return `<li><span>🎟️ </span><output>${lotto.getLottoNumber().join(", ")}</output></li>`;
  },

  printLottos(lottos) {
    document.querySelector("#lottos").innerHTML = lottos
      .map((lotto) => this.lottoToHTML(lotto))
      .join("");
  },
  updateMatchCounts(matchResult) {
    document.querySelectorAll(".match-count").forEach((el, index) => {
      const ranks = [5, 4, 3, 2, 1];
      el.textContent = matchResult.get(ranks[index]);
    });
  },

  printResult(matchResult, rateOfReturn) {
    this.updateMatchCounts(matchResult);
    document.querySelector("#rate-of-return").textContent = rateOfReturn;
    document.querySelector("#result-modal").showModal();
  },
};
