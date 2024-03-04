export const MESSAGES = {
  gameIntro:
    "🎱 행운의 로또 게임 🎱 \n< 게임 방법 >\n구입 금액은 1000단위 숫자로 입력해주세요 (ex. 5000)\n로또 번호는 1~45 사이의 중복되지 않는 숫자 6개를 쉼표로 구분하여 입력해주세요 (ex. 1,2,3,4,5,6)\n보너스 번호는 로또 번호와 중보되지 않는 1~45 사이의 숫자 1개를 입력해주세요(ex. 7)\n",
  purchasedLottoCount: (lottoCount) => `${lottoCount}개를 구매했습니다.`,
  returnRate: (returnRate) => `총 수익률은 ${returnRate}%입니다.`,
  resultIntro: "당첨 통계\n--------------------",
  result: ({ matchedCount, useBonusNumber, reward, resultCount }) => {
    return useBonusNumber
      ? `${matchedCount}개 일치, 보너스 볼 일치 (${reward.toLocaleString()}원) - ${resultCount}개`
      : `${matchedCount}개 일치(${reward.toLocaleString()}원) - ${resultCount}개`;
  },
};

export const ERROR_MESSAGES = {
  prefix: "",
  invalidNumbersType: "로또 번호는 1~45 사이의 숫자여야 합니다.",
  invalidLottoLength: "로또 번호는 6개여야 합니다.",
  invalidLottoUniqueness: "로또 번호는 중복될 수 없습니다.",
  invalidPurchaseAmount: "구입 금액은 1000단위의 숫자여야 합니다.",
  invalidPurchaseQuantity: "구입 금액은 최대 100.000까지 가능합니다.",
  invalidBonusNumberType: "보너스 번호는 1~45 사이의 숫자여야 합니다.",
  invalidBonusNumberUniqueness: "보너스 번호는 로또 번호와 중복될 수 없습니다.",
  invalidRetrySign: "재시작 신호는 y또는 n이어야 합니다.",
};
