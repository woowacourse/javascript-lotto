export const DOMOutput = {
  printPurchaseLottoCount(count) {
    document.querySelector("#purchase-amount-output").textContent =
      `총 ${count}개를 구매하였습니다.`;
  },

  printLottos(lottos) {
    const list = document.querySelector("#lottos");
    list.replaceChildren();

    lottos.forEach((lotto) => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = "🎟️ ";

      const output = document.createElement("output");
      output.textContent = lotto.getLottoNumber().join(", ");

      li.append(span, output);
      list.append(li);
    });
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
