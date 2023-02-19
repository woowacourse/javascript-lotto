import { LOTTO_PRICE, PLACE, PRIZE_MONEY } from "./constants";

export const MESSAGE = {
  INPUT: {
    lottoPurchaseAmount: "로또 구입 금액을 입력해 주세요.",
    winningLottoNumbers: "당첨 번호를 콤마(,)로 구분해서 입력해 주세요.",
    bonusNumber: "보너스 번호를 입력해 주세요.",
    restartOrQuit: "다시 시작하시겠습니까? (y/n)",
  },

  OUTPUT: {
    numberOfPurchasedMessage(numberOfPurchasedLottoTickets) {
      return `${numberOfPurchasedLottoTickets}개를 구매했습니다.`;
    },
    statistics(placesOfLottoTickets) {
      return `\n당첨 통계
--------------------
3개 일치 (${PRIZE_MONEY.fifth.toLocaleString()}원) - ${placesOfLottoTickets[PLACE.fifth]}개
4개 일치 (${PRIZE_MONEY.fourth.toLocaleString()}원) - ${placesOfLottoTickets[PLACE.fourth]}개
5개 일치 (${PRIZE_MONEY.third.toLocaleString()}원) - ${placesOfLottoTickets[PLACE.third]}개
5개 일치, 보너스 볼 일치 (${PRIZE_MONEY.second.toLocaleString()}원) - ${
        placesOfLottoTickets[PLACE.second]
      }개
6개 일치 (${PRIZE_MONEY.first.toLocaleString()}원) - ${placesOfLottoTickets[PLACE.first]}개`;
    },
    rateOfReturnMessage(rateOfReturn) {
      return `총 수익률은 ${rateOfReturn}% 입니다.\n`;
    },
  },

  ERROR: {
    inputLottoPrice: `[ 에러 ] ${LOTTO_PRICE}원 단위로 입력해 주세요.`,
    inputInteger: "[ 에러 ] 정수를 입력해 주세요.",
    inputNotDupicatedLottoNumber: "[ 에러 ] 번호 중복 없이 입력해 주세요.",
    inputBetween1And45: "[ 에러 ] 1 ~ 45 사이의 숫자를 입력해 주세요.",
    inputSixLottoNumbers: "[ 에러 ] 6개의 로또 번호를 입력해 주세요.",
    inputNotDupicatedBonusNumber: "[ 에러 ] 로또 번호와 중복되지 않게 보너스 번호를 입력해 주세요.",
    inputRestartOrQuitCharacter: "[ 에러 ] 대, 소문자 Y/y 또는 N/n을 입력해 주세요.",
  },
};
