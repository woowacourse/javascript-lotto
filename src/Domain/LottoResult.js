class LottoResult {
  calculateWinningResult(lottos, winningNumbersObj) {
    const result = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
    for (let lotto of lottos) {
      const match = lotto.countMatches(winningNumbersObj.winningNumbers());
      const hasBonus = lotto.hasBonus(winningNumbersObj.bonusNumber());
      if (match === 6) result['FIRST']++;
      else if (match === 5 && hasBonus) result['SECOND']++;
      else if (match === 5) result['THIRD']++;
      else if (match === 4) result['FOURTH']++;
      else if (match === 3) result['FIFTH']++;
    }
    return result;
  }
}

export default LottoResult;