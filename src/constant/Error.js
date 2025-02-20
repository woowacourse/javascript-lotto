const ERROR = {
  USER_INPUT: {
    IS_EMPTY: "[ERROR] 빈 값은 입력할 수 없습니다.",
  },
  WINNING_NUMBERS: {
    IS_WRONG_ARRAY_LENGTH: "[ERROR] 로또는 6개의 숫자로 이루어져야합니다.",
    IS_DUPLICATED_NUMBER: "[ERROR] 중복된 숫자는 입력하실 수 없습니다.",
    IS_ARRAY_NUMBER_RANGE_OVER: "[ERROR] 1~45 사이의 숫자를 입력해야합니다.",
    IS_NOT_NATURAL_NUMBER_IN_ARRAY: "[ERROR] 숫자는 자연수여야 합니다.",
  },
  BONUS_NUMBER: {
    IS_NUMBER_RANGE_OVER: "[ERROR] 1~45 사이의 숫자를 입력해야합니다.",
    IS_NOT_NATURAL_NUMBER: "[ERROR] 숫자는 자연수여야 합니다.",
    IS_DUPLICATED: "[ERROR] 당첨번호와 중복된 숫자는 입력하실 수 없습니다.",
  },
  WINNINGS_AND_BONUS: {
    IS_DUPLICATED: "[ERROR] 당첨번호와 중복된 숫자는 입력하실 수 없습니다.",
  },
  PURCHASE_PRICE: {
    IS_NUMBER_RANGE_OVER:
      "[ERROR] 1000 이상 100억 이하의 숫자를 입력해야합니다.",
    IS_NOT_MULTIPLE: "[ERROR] 1000 단위로 나누어 떨어지는 숫자여야합니다.",
  },
  RESTART: {
    IS_NOT_YN: "[ERROR] 선택은 Y 또는 N 으로 입력해야합니다.",
  },
};

export default ERROR;
