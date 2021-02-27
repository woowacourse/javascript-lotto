export const INVALID_PRICE_ERROR = "1000원 단위의 금액을 입력하세요.";
export const INVALID_WINNGNUMBER_ERROR = "1부터 45사이의 숫자를 입력하세요";
export const DUPLICATED_WINNINGNUMBER_ERROR = "당첨번호는 중복 될 수 없습니다.";
export const LOTTO_TABLE = {
  RANKING1: {
    NAME: "ranking1",
    PRIZE: 2000000000,
    CONDITION: "6개",
  },
  RANKING2: {
    NAME: "ranking2",
    PRIZE: 30000000,
    CONDITION: "5개 + 보너스볼",
  },
  RANKING3: {
    NAME: "ranking3",
    PRIZE: 1500000,
    CONDITION: "5개",
  },
  RANKING4: {
    NAME: "ranking4",
    PRIZE: 50000,
    CONDITION: "4개",
  },
  RANKING5: {
    NAME: "ranking5",
    PRIZE: 5000,
    CONDITION: "3개",
  },
  NO_PRIZE: {
    NAME: "noPrize",
    PRIZE: 0,
    CONDITION: "2개 이하",
  },
};
