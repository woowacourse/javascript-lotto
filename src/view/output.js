const printUserLottos = (userLottos) => {
  printLottoCount(userLottos.price);
  userLottos.lottos.forEach((userLotto) => {
    console.log(userLotto.numbers);
  });
};

const printLottoCount = (price) => {
  console.log(`${Number(price / 1000)}개를 구매했습니다.`);
};

const printWinningResult = (prizeResult) => {
  console.log("\n당첨 통계");
  console.log("--------------------");
  console.log(`3개 일치 (5,000원) - ${prizeResult.fifthPrize}개`);
  console.log(`4개 일치 (50,000원) - ${prizeResult.fourthPrize}개`);
  console.log(`5개 일치 (1,500,000원) - ${prizeResult.thirdPrize}개`);
  console.log(
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${prizeResult.secondPrize}개`
  );
  console.log(`6개 일치 (2,000,000,000원) - ${prizeResult.firstPrize}개`);
};

const printROI = (ROI) => {
  console.log(`총 수익률은 ${ROI}%입니다.`);
};

export { printUserLottos, printWinningResult, printROI };
