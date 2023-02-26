const MESSAGE = Object.freeze({
  BUY_LOTTO: quantity => `${quantity}개를 구매했습니다.`,
  WINNING_NUMBERS: '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  RESULT: '결과 확인하기',
  STATISTICS: '🏆 당첨 통계 🏆',
  GET_PROFIT: profit => `당신의 총 수익률은 ${profit}%입니다.`,
});

export default MESSAGE;
