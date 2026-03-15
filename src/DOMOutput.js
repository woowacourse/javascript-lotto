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
  // printResult(matchResult, rateOfReturn) {
  //   console.log("\n당첨 통계");
  //   console.log("--------------------");
  //   console.log(`3개 일치 (5,000원) - ${matchResult.get(5)}개`);
  //   console.log(`4개 일치 (50,000원) - ${matchResult.get(4)}개`);
  //   console.log(`5개 일치 (1,500,000원) - ${matchResult.get(3)}개`);
  //   console.log(
  //     `5개 일치, 보너스 볼 일치 (30,000,000원) - ${matchResult.get(2)}개`,
  //   );
  //   console.log(`6개 일치 (2,000,000,000원) - ${matchResult.get(1)}개`);
  //   console.log(`총 수익률은 ${rateOfReturn}%입니다.\n`);
  // },
};
