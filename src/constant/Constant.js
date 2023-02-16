const MESSAGES = {
  readMoneyText: "> 구입금액을 입력해 주세요. ",
  readWinningNumbersText: "\n> 당첨 번호를 입력해 주세요. ",
  readBonusNumberText: "\n> 보너스 번호를 입력해 주세요. ",
  readCommandRestartText: "\n> 다시 시작하시겠습니까? (y/n) ",

  printLottoCountText: "개를 구매했습니다.",
  printRankResultText: "\n당첨 통계\n-------------------",
  piecesText: "개",
  printFifthText: "3개 일치 (5,000원) - ",
  printFourthText: "4개 일치 (50,000원)) - ",
  printThridText: "5개 일치 (1,500,000원) - ",
  printSecondText: "5개 일치, 보너스 볼 일치 (30,000,000원) - ",
  printFirstText: "6개 일치 (2,000,000,000원) - ",
  printRevenueText: "총 수익률은 ",
  printFinalText: "%입니다.",
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

module.exports = { MESSAGES, ERRORMESSAGES };
