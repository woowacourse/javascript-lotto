const LottoResultMaker = {
  calculateLottoResult(issuedLottoArray, winningCombination) {
    return issuedLottoArray.map((issuedLotto) => {
      const { normalNumbers, bonusNumber } = winningCombination;
      return issuedLotto.reduce(
        (result, number) => {
          if (normalNumbers.includes(number)) {
            result.normalNumber += 1;
          }
          if (number === bonusNumber) {
            result.bonusNumber += 1;
          }
          return result;
        },
        { normalNumber: 0, bonusNumber: 0 }
      );
    });
  },
};

export default LottoResultMaker;
