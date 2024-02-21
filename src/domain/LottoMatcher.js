class LottoMatcher {
  #matchingResult;

  constructor(tickets, [winningNumber, bonusNumber]) {
    this.#matchingResult = {
      6: 0,
      '5+보너스': 0,
      5: 0,
      4: 0,
      3: 0,
    };
    this.match(tickets, [winningNumber, bonusNumber]);
  }

  match(tickets, [winningNumber, bonusNumber]) {
    tickets.forEach((ticket) => {
      const matchCount = ticket.filter((number) => winningNumber.includes(number)).length;
      const hasBonusNumber = this.compareBonusNumber(ticket, bonusNumber);
      this.updateMatchingResult(matchCount, hasBonusNumber);
    });
  }

  compareBonusNumber(ticket, bonusNumber) {
    return ticket.includes(bonusNumber);
  }

  updateMatchingResult(matchCount, hasBonusNumber) {
    if (hasBonusNumber) this.#matchingResult[String('5+보너스')] += 1;
    if (!hasBonusNumber) this.#matchingResult[matchCount] += 1;
  }
}

export default LottoMatcher;
