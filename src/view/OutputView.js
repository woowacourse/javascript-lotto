const OutputView = {
  printUserLottos(lotto) {
    console.log(`[${lotto.join(", ")}]`);
  },

  print(message) {
    console.log(message);
  },
};

export default OutputView;
