class LottoMatcher {
  #matchingResult;

  constructor(tickets, [winningNumber, bonusNumber]) {
    this.#matchingResult = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    this.match(tickets, [winningNumber, bonusNumber]);
  }

  match(tickets, [winningNumber, bonusNumber]) {
    tickets.forEach((ticket) => {
      const matchCount = ticket.filter((number) => winningNumber.includes(number)).length;
      const hasBonusNumber = this.compareBonusNumber(ticket, bonusNumber);
      if (matchCount >= 3) this.updateMatchingResult(matchCount, hasBonusNumber);
    });
  }

  compareBonusNumber(ticket, bonusNumber) {
    return ticket.includes(bonusNumber);
  }

  updateMatchingResult(matchCount, hasBonusNumber) {
    if (hasBonusNumber) this.#matchingResult[2] += 1;
    if (!hasBonusNumber) this.updateMatchingLottoNumber(matchCount);
  }

  updateMatchingLottoNumber(matchCount) {
    if (matchCount === 3) this.#matchingResult[5] += 1;
    if (matchCount === 4) this.#matchingResult[4] += 1;
    if (matchCount === 5) this.#matchingResult[3] += 1;
    if (matchCount === 6) this.#matchingResult[1] += 1;
  }

  get matchingResult() {
    return this.#matchingResult;
  }
}

export default LottoMatcher;
