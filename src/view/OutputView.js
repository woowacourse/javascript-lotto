const OutputView = {
  printLottoQuantity(quantity) {
    console.log(`${quantity}개를 구매했습니다.`);
  },
  printSingLotto(lotto) {
    console.log(`[${lotto.join(', ')}]`);
  },
};

export default OutputView;
