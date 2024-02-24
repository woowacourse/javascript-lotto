const LottoResultMaker = {
  calculateLottoResult(issuedLottoArray, winningCombination) {
    return issuedLottoArray.map((issuedLotto) => {
      const { normalNumbers, bonusNumber } = winningCombination;
      return issuedLotto.reduce(
        (result, number) => {
          if (normalNumbers.includes(number)) {
            result.normalResult += 1;
          }
          if (number === bonusNumber) {
            result.bonusResult += 1;
          }
          return result;
        },
        { normalResult: 0, bonusResult: 0 }
      );
    });
  },
};

export default LottoResultMaker;
