const MESSAGES = {
  readMoneyText: "> 구입금액을 입력해 주세요. ",
  readWinNumbersText: "\n> 당첨 번호를 입력해 주세요. ",
  readBonusNumberText: "\n> 보너스 번호를 입력해 주세요. ",
  readCommandRestartText: "\n> 다시 시작하시겠습니까? (y/n) ",

  printLottoCountText: "개를 구매했습니다.",
};

const ERRORMESSAGES = {
  isWrongMoneyText: "[ERROR] 구입 금액은 1000원 단위로 입력하세요.\n",

  isOverRangeNumberText: "[ERROR] 당첨 번호는 1부터 45까지로 입력하세요.\n",
  isWrongLottoNumberText: "[ERROR] 당첨 번호를 6개 입력하세요.\n",
  isSameLottoNumberText: "[ERROR] 당첨 번호를 중복 없이 입력하세요.\n",

  isOverRangeBounsText: "[ERROR] 보너스 번호는 1부터 45까지로 입력하세요.\n",
  isSameBonusNumberText: "[ERROR] 당첨 번호와 중복 없이 입력하세요.\n",

  isWrongCommandText: "[ERROR] 재시작 명령어는 y혹은 n으로만 입력하세요.\n",
};

const RANK = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  LOSER: 0,
};

const LOTTO = {
  MAX: 45,
  MIN: 1,
  SIZE: 6,
};

const PRIZE_AMOUNT = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

module.exports = {
  MESSAGES,
  ERRORMESSAGES,
  RANK,
  LOTTO,
  PRIZE_AMOUNT,
};
