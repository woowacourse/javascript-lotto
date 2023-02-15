const PRIZE = Object.freeze({
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
});

const MESSAGE = Object.freeze({
  INPUT_PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
  INPUT_WINNING_NUMBER: '당첨 번호를 입력해 주세요. ',
  INPUT_BONUS_NUMBER: '보너스 번호를 입력해 주세요. ',
  INPUT_WHETHER_TO_RESTART: '> 다시 시작하시겠습니까? (y/n)',
  OUTPUT_LOTTO_COUNT: '개를 구매했습니다.',
});

export { PRIZE, MESSAGE };
