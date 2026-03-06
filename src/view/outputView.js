export const printPurchaseCount = (purchaseCount) => {
  console.log(`${purchaseCount}개를 구매했습니다.`);
};
export const printPurchasedLottoNumbers = (purchaseLottoLists) => {
  if (
    !Array.isArray(purchaseLottoLists) ||
    !Array.isArray(purchaseLottoLists[0].getNumbers())
  )
    throw new Error("[ERROR]");
  purchaseLottoLists.forEach((lottoNumbers) =>
    console.log(`[${lottoNumbers.getNumbers().join(", ")}]`)
  );
};
export const printWinStatistics = (prizeList) => {
  if (!Array.isArray(prizeList)) throw new Error("[ERROR]");
  console.log("당첨 통계");
  console.log("--------------------");
  console.log(`3개 일치 (5,000원) - ${prizeList[5]}개`);
  console.log(`4개 일치 (50,000원) - ${prizeList[4]}개`);
  console.log(`5개 일치 (1,500,000원) - ${prizeList[3]}개`);
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${prizeList[2]}개`);
  console.log(`6개 일치 (2,000,000,000원) - ${prizeList[1]}개`);
};
export const printProfitRate = (profitRate) => {
  console.log(`총 수익률은 ${profitRate}%입니다.`);
};
