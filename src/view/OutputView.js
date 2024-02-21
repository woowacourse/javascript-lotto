const OutputView = {
  printLottoCount(count = 0) {
    console.log(`${count}개를 구매했습니다.`);
  },

  printRnadomLottos(numbers) {
    console.log(numbers);
  },
  printError(message) {
    console.log(message);
  },
};

export default OutputView;
