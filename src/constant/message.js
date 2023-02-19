const MESSAGE = Object.freeze({
  BUY_LOTTO: quantity => `${quantity}개를 구매했습니다.`,
  PROFIT: profit => `총 수익률은 ${profit}%입니다.`,
  MATCH_RESULT: (matchLetter, amountOfRank) =>
    `${matchLetter}${amountOfRank}개`,
  STATISTICS: '당첨 통계',
  DIVISION_LINE: '--------------------',
  MATCH_TABLE: [
    '3개 일치 (5,000원) - ',
    '4개 일치 (50,000원) - ',
    '5개 일치 (1,500,000원) - ',
    '5개 일치, 보너스 볼 일치 (30,000,000원) - ',
    '6개 일치 (2,000,000,000원) - ',
  ],
});

export default MESSAGE;
