const ERROR_MESSAGE = Object.freeze({
  notANumber: '[ERROR] 문자는 입력할 수 없습니다. 다시 입력해주세요.',
  notInteger: '[ERROR] 정수가 아닌 수는 입력할 수 없습니다. 다시 입력해주세요.',
  notPositive:
    '[ERROR] 양수가 아닌 수는 입력할 수 없습니다. 다시 입력해주세요.',
  notSixNumbers:
    '[ERROR] 로또는 6개의 숫자로 이루어져야 합니다. 다시 입력해주세요.',
  duplicatedNumbers:
    '[ERROR] 로또 번호는 중복될 수 없습니다. 다시 입력해주세요.',
  numberOutOfRange:
    '[ERROR] 로또 번호는 1-45 사이여야 합니다. 다시 입력해주세요.',
  notANote:
    '[ERROR] 금액은 1,000원 단위로 입력하셔야 합니다. 다시 입력해주세요.',
  notEnoughMoney: '[ERROR] 최소 금액은 1,000원 입니다. 다시 입력해주세요.',
});

export default ERROR_MESSAGE;
