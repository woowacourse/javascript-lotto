const systemSettings = {
  getPurchasePrice: '> 구입금액을 입력해 주세요.',
  getWinningNumber: '> 당첨 번호를 입력해 주세요.',
  getBonusNumber: '> 보너스 번호를 입력해 주세요.',
  askUserRetry: '> 다시 시작하시겠습니까? (y/n)',

  winCount: {
    NO_MATCH: 0,
    THREE_MATCH: 0,
    FOUR_MATCH: 0,
    FIVE_MATCH: 0,
    FIVE_MATCH_WITH_BONUS: 0,
    SIX_MATCH: 0,
  },
  prizeMoney: {
    NO_MATCH: 0,
    THREE_MATCH: 5_000,
    FOUR_MATCH: 50_000,
    FIVE_MATCH: 1_500_000,
    FIVE_MATCH_WITH_BONUS: 30_000_000,
    SIX_MATCH: 2_000_000_000,
  },
  lottoSize: 6,
  lottoPrice: 1_000,
  minLottoNumber: 1,
  maxLottoNumber: 45,
};

export default systemSettings;
