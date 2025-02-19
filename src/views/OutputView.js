const OutputView = {
  printPurchaseLottos: function (purchaseLottos) {
    console.log(`${purchaseLottos.length}개를 구입했습니다.`);
    purchaseLottos.forEach((purchaseLotto) => {
      console.log(`[${purchaseLotto.numbers.join(", ")}]`);
    });
    console.log();
  },

  printResult: function (counts, profitRate) {
    console.log("\n당첨 통계");
    console.log("--------------------");
    console.log(`3개 일치 (5,000원)- ${counts[0]}개`);
    console.log(`4개 일치 (50,000원)- ${counts[1]}개`);
    console.log(`5개 일치 (1,500,000원)- ${counts[2]}개`);
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원)- ${counts[3]}개`);
    console.log(`6개 일치 (2,000,000,000원)- ${counts[4]}개`);
    console.log(
      `총 수익률은 ${profitRate.toFixed(1).toLocaleString()}%입니다.`
    );
  },
};

export default OutputView;
