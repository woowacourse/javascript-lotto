const ERROR = {
  beNotBlank: '[Error] 숫자 입력은 공백이 아니어야 합니다.',
  beNumber: '[Error] 입력은 숫자형 이어야 합니다.',
  beInRangeNumber: '[Error] 입력은 1~45사이의 숫자여야 합니다.',
  beInteger: '[Error] 입력은 정수여야 합니다.',

  beNotDuplicated: '[Error] 로또 번호의 중복은 없어야합니다.',
  countOfWinningNumbers: '[Error] 당첨 번호의 갯수는 6개여야 합니다.',

  bonusNumberDuplication:
    '[Error] 보너스 번호는 당첨 번호와 중복되지 않아야합니다.',

  beMultiple: '[Error] 구입금액은 1000의 배수여야 합니다.',

  retryYN: '[Error] 재시도 여부는 y나 n값이어야 합니다.',
};

export default ERROR;
