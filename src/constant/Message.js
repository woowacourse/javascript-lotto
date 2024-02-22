const MESSAGE = Object.freeze({
  prompt: {
    purchaseMoney: '> 구입금액을 입력해 주세요.',
    winningNumber: '> 당첨 번호를 입력해 주세요. ',
    bonusNumber: '> 보너스 번호를 입력해 주세요. ',
    retry: '> 다시 시작하시겠습니까? (y/n) ',
  },
  winningCharacteristicsHeader: '당첨 통계',
  lineSplitter: '--------------------',
  winningCharacteristics: {
    3: '3개 일치 (5,000원)',
    4: '4개 일치 (50,000원)',
    5: '5개 일치 (1,500,000원)',
    '5-1': '5개 일치, 보너스 볼 일치 (30,000,000원)',
    6: '6개 일치 (2,000,000,000원)',
  },
});

export default MESSAGE;
