export const matchLotto =  {
    winningNumbers(winningLotto, lotto) {
        return winningLotto.matchedWinningCount(lotto)
      },

    bonusNumber(winningLotto, lotto){
        return winningLotto.isBonusMatched(lotto)
    }
};
