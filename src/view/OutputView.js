const OutputView = {
  print(message) {
    console.log(message);
  },
  printLottoArray(lottoArray) {
    lottoArray.forEach((lotto) => console.log(lotto.numbers));
  },
};

export default OutputView;
