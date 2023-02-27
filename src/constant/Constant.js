const MESSAGES = {
  printLottoCount: "개를 구매했습니다.",
  total: "총 ",
  pieces: "개",
  printRevenue: "당신의 총 수익률은 ",
  printFinal: "%입니다.",
};

const ERROR_MESSAGES = {
  isWrongMoney: "[ERROR] 구입 금액은 1000원 단위로 입력하세요.",

  isOverRangeNumber: "[ERROR] 당첨 번호는 1부터 45까지로 입력하세요.",
  isWrongLottoNumber: "[ERROR] 당첨 번호를 6개 입력하세요.",
  isSameLottoNumber: "[ERROR] 당첨 번호를 중복 없이 입력하세요.",

  isOverRangeBonus: "[ERROR] 보너스 번호는 1부터 45까지로 입력하세요.",
  isSameBonusNumber: "[ERROR] 보너스 번호는 당첨 번호와 중복 없이 입력하세요.",

  isWrongCommand: "[ERROR] 재시작 명령어는 y혹은 n으로만 입력하세요.",
};

const RANK = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  LOSER: 0,
};

const RANK_BY_CORRECT_COUNT = {
  6: RANK.FIRST,
  BONUS: RANK.SECOND,
  5: RANK.THIRD,
  4: RANK.FOURTH,
  3: RANK.FIFTH,
  2: RANK.LOSER,
  1: RANK.LOSER,
  0: RANK.LOSER,
};

const LOTTO = {
  MAX: 45,
  MIN: 1,
  NUM_SIZE: 6,
};

const PRIZE = {
  [RANK.FIRST]: 2000000000,
  [RANK.SECOND]: 30000000,
  [RANK.THIRD]: 1500000,
  [RANK.FOURTH]: 50000,
  [RANK.FIFTH]: 5000,
};

const DECIMAL = 10;

module.exports = {
  MESSAGES,
  ERROR_MESSAGES,
  RANK,
  RANK_BY_CORRECT_COUNT,
  LOTTO,
  PRIZE,
  DECIMAL,
};
