export function printMessage(message) {
  console.log(message);
}

export function printError(errorMessage) {
  console.error(errorMessage);
}

export function printPurchasedAmount(amount) {
  console.log(`${amount}개를 구매했습니다.`);
}

export function printLotto(lotto) {
  console.log(`[${lotto.numbers.join(', ')}]`);
}

export function printPrizeHeader() {
  console.log('당첨 통계\n--------------------');
}

export function printPrize(systemSettings) {
  const { prizeMoney, winCount } = systemSettings;

  console.log(`
3개 일치 (${prizeMoney.THREE_MATCH.toLocaleString()}원) - ${
    winCount.THREE_MATCH
  }개
4개 일치 (${prizeMoney.FOUR_MATCH.toLocaleString()}원) - ${
    winCount.FOUR_MATCH
  }개
5개 일치 (${prizeMoney.FIVE_MATCH.toLocaleString()}원) - ${
    winCount.FIVE_MATCH
  }개
5개 일치, 보너스 볼 일치 (${prizeMoney.FIVE_MATCH_WITH_BONUS.toLocaleString()}원) - ${
    winCount.FIVE_MATCH_WITH_BONUS
  }개
6개 일치 (${prizeMoney.SIX_MATCH.toLocaleString()}원) - ${winCount.SIX_MATCH}개
  `);
}
