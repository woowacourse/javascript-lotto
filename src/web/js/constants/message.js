const MESSAGE = Object.freeze({
  BUY_LOTTO: quantity => `${quantity}개를 구매했습니다.`,
  RESULT: '결과 확인하기',
  GET_PROFIT: profit => `총 수익률은 ${profit}%입니다.`,
  STATISTICS: '당첨 통계',
  DIVISION_LINE: '--------------------',
  MATCH_TABLES: [
    '3개 일치 (5,000원) - ',
    '4개 일치 (50,000원) - ',
    '5개 일치 (1,500,000원) - ',
    '5개 일치 보너스 볼 일치 (30,000,000원) - ',
    '6개 일치 (2,000,000,000원) - ',
  ],
  GET_TABLE: amountOfRanks => {
    return MESSAGE.MATCH_TABLES.map(
      (prize, i) => `${prize}${amountOfRanks[amountOfRanks.length - i - 1]}`
    ).join('\n');
  },
});

export default MESSAGE;
