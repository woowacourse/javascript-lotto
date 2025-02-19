function printErrorMessage(errorMessage) {
  console.log(`${errorMessage}\n`);
}

function printLottos(lottos) {
  lottos.forEach((lotto) => {
    console.log(`[${lotto.numbers.join(', ')}]`);
  });
}

const OutputView = {
  printErrorMessage,
  printLottos,
};

export default OutputView;
