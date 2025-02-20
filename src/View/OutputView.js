function printErrorMessage(errorMessage) {
  console.log(`${errorMessage}\n`);
}

function printLottos(lottos) {
  lottos.forEach((lotto) => {
    console.log(`[${lotto.numbers.join(', ')}]`);
  });
}

function printWinningHistory(rankHistory) {
  console.log(`당첨 통계`);
  console.log(`--------------------`);
  console.log(`3개 일치 (5,000원) - ${rankHistory.fifth}개`);
  console.log(`4개 일치 (50,000원) - ${rankHistory.fourth}개`);
  console.log(`5개 일치 (1,500,000원) - ${rankHistory.third}개`);
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankHistory.second}개`);
  console.log(`6개 일치 (2,000,000,000원) - ${rankHistory.first}개`);
}

function printPrizeRate(rate) {
  console.log(`총 수익률은 ${rate}%입니다.`);
}

const OutputView = {
  printErrorMessage,
  printLottos,
  printWinningHistory,
  printPrizeRate,
};

export default OutputView;
