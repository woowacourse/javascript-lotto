const PROGRESS_MESSAGE = Object.freeze({
  INPUT_MONEY: '구입금액을 입력해 주세요.',
  INPUT_WINNING_LOTTO: '당첨 번호를 입력해주세요.',
  INPUT_BONUS_NUMBER: '보너스 번호를 입력해주세요.',
  SELECT_RE_RUN: '다시 시작하시겠습니까? (y/n)',
  BUY_LOTTO: '개를 구매했습니다.',
  RESULT_HEADER: '당첨 통계\n--------------------',
  RATE_OF_RETURN_MESSAGE: (rateOfReturn) => `총 수익률은 ${rateOfReturn.toLocaleString()}% 입니다.`,
});

export default PROGRESS_MESSAGE;
