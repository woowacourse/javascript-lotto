const OutputView = {
  print(message) {
    console.log(message);
  },
  printError(error) {
    console.error(error);
  },
  printLottoArray(lottoArray) {
    lottoArray.forEach((lotto) => OutputView.print(lotto.numbers));
  },
};

export default OutputView;
