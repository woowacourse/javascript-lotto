import deepFreeze from '@lotto/utils/deepFreeze';

const messages = deepFreeze({
  input: {
    money: '> 구입금액을 입력해 주세요.',
    winningNumber: '\n> 당첨 번호를 입력해 주세요.',
    bonusNumber: '\n> 보너스 번호를 입력해 주세요.',
    restart: '\n> 다시 시작하시겠습니까? (y/n)',
  },

  output: {
    lottoCount: '개를 구매했습니다.',
  },

  error: {
    positiveInteger: '[ERROR] 숫자를 입력해주세요.',
    thousandsWon: '[ERROR] 1000원 단위의 금액을 입력해주세요.',
    validSixNumbers: '[ERROR] ,로 이루어진 여섯개의 1부터 45까지의 숫자를 입력해주세요',
    hasBlank: '[ERROR] 공백을 제외하고 입력해주세요',
    inRange: '[ERROR] 1에서 45까지의 숫자를 입력해주세요.',
    yOrN: '[ERROR] y 혹은 n 만 입력 가능합니다.',
  },

  statisticsMessages: {
    opening: '\n당첨 통계\n---',
    fifth: '3개 일치 (5,000원) - ',
    fourth: '4개 일치 (50,000원) - ',
    third: '5개 일치 (1,500,000원) - ',
    second: '5개 일치, 보너스 볼 일치 (30,000,000원) - ',
    first: '6개 일치 (2,000,000,000원) - ',
  },
});

export default messages;
