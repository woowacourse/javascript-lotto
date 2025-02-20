const OutputView = {
  printLottoQuantity(quantity) {
    console.log(`${quantity}개를 구매했습니다.`);
  },
  printSingLotto(lotto) {
    console.log(`[${lotto.join(', ')}]`);
  },
  printRankResult(key, value) {
    console.log(`${key} (${(value.price).toLocaleString()}원) - ${value.count}개`);
  },

};

export default OutputView;
