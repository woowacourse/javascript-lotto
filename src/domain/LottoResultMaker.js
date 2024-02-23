const LottoResultMaker = {
  calculateLottoResult(issuedLottoArray, winningCombination) {
    return issuedLottoArray.map((issuedLotto) => {
      const { winningNumbers, winningBonus } = winningCombination;
      return issuedLotto.reduce(
        (result, number) => {
          if (winningNumbers.includes(number)) {
            result.normalNumber += 1;
          }
          if (number === winningBonus) {
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
