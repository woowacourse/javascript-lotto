const ERROR = Object.freeze({
  beNotBlank: '[Error] 숫자 입력은 공백이 아니어야 합니다.',
  beNotNumber: '[Error] 입력은 숫자형 이어야 합니다.',
  beInRangeNumber: '[Error] 입력은 숫자형 이어야 합니다.',
  beInteger: '[Error] 입력은 정수여야 합니다.',

  beNotDuplication: '[Error] 로또 번호의 중복은 없어야합니다.',
  countOfWinningNumbers: '[Error] 당첨 번호의 갯수는 6개여야 합니다.',

  bonusNumberDuplication:
    '[Error] 보너스 번호는 당첨 번호와 중복되지 않아야합니다.',
});

export default ERROR;
