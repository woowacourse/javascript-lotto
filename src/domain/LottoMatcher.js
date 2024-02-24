class LottoMatcher {
  match(tickets, { winningNumbers, bonusNumber }) {
    const matchingResult = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    tickets.forEach((ticket) => {
      const matchCount = ticket.filter((number) => winningNumbers.includes(number)).length;
      const hasBonusNumber = this.#compareBonusNumber(ticket, bonusNumber);
      this.#updateMatchingResult(matchingResult, { matchCount, hasBonusNumber });
    });
    return matchingResult;
  }

  #compareBonusNumber(ticket, bonusNumber) {
    return ticket.includes(bonusNumber);
  }

  #updateMatchingResult(matchingResult, { matchCount, hasBonusNumber }) {
    if (matchCount === 6) matchingResult[1] += 1;
    if (matchCount === 5 && hasBonusNumber) matchingResult[2] += 1;
    if (matchCount === 5 && !hasBonusNumber) matchingResult[3] += 1;
    if (matchCount === 4) matchingResult[4] += 1;
    if (matchCount === 3) matchingResult[5] += 1;
  }
}

export default LottoMatcher;
