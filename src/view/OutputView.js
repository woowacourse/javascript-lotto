const OutputView = {
  printPurchaseMessage(purchaseAmount) {
    console.log(`${purchaseAmount / 1000}개를 구매했습니다.`);
  },

  printLottos(lottoNumberArray) {
    lottoNumberArray.forEach((lottoNumber) => {
      console.log(lottoNumber.sort((a, b) => a - b));
    });
  },
};
export default OutputView;
