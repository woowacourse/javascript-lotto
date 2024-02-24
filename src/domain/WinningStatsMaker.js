class WinningStatsMaker {
  makeWinningStats(tickets, { winningNumbers, bonusNumber }) {
    const winningStats = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    tickets.forEach((ticket) => {
      const rank = this.judgeWinning(ticket, { winningNumbers, bonusNumber });
      this.#updateWinningStats(rank, winningStats);
    });
    return winningStats;
  }

  #compareBonusNumber(ticket, bonusNumber) {
    return ticket.includes(bonusNumber);
  }

  judgeWinning(ticket, { winningNumbers, bonusNumber }) {
    const matchCount = ticket.filter((number) => winningNumbers.includes(number)).length;
    const hasBonusNumber = this.#compareBonusNumber(ticket, bonusNumber);
    if (matchCount === 6) return 1;
    if (matchCount === 5 && hasBonusNumber) return 2;
    if (matchCount === 5 && !hasBonusNumber) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 5;
    if (matchCount < 3) return 7;
  }

  #updateWinningStats(rank, winningStats) {
    if (rank < 7) winningStats[rank] += 1;
  }
}

export default WinningStatsMaker;
