/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import LottoGenerator from "./LottoGenerator";
import WinningLotto from "./Model/WinningLotto";
import ScoreBoard from "./ScoreBoard";
import {
  validateArrayLength,
  validateNotDuplicated,
  validateNumberDivided,
  validateNumberLower,
  validateNumberUpper,
  validatePositiveNumber,
} from "./Validator";
import LottoList from "./View/LottoList";
import MoneyForm from "./View/MoneyForm";
import ResultModal from "./View/ResultModal";
import WinningForm from "./View/WinningForm";

const lottoState = {
  money: 0,
  lottos: [],
};

MoneyForm.bindSubmit(() => {
  try {
    lottoState.money = MoneyForm.getMoney();

    validatePositiveNumber(lottoState.money);
    validateNumberDivided(lottoState.money, LOTTO.PRICE);

    const buyLottoCount = lottoState.money / LOTTO.PRICE;
    lottoState.lottos = LottoGenerator.makeLottos(buyLottoCount);

    // Controller가 LottoList와 WinningForm을 연결
    LottoList.render(lottoState.lottos);
    LottoList.show();
    WinningForm.show();
  } catch (error) {
    alert(error.message);
  }
});

WinningForm.bindResultClick(() => {
  try {
    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
    const allRankCount = ScoreBoard.makeAllRankCount(
      lottoState.lottos,
      winningLotto,
    );
    const rate = ScoreBoard.getProfitRate(allRankCount, lottoState.money);

    ResultModal.renderResult(allRankCount, rate);
    ResultModal.show();
  } catch (error) {
    alert(error.message);
  }
});

ResultModal.bindClose(() => {
  ResultModal.close();
});

ResultModal.bindRestart(() => {
  ResultModal.reset();
  LottoList.reset();
  WinningForm.reset();
  MoneyForm.reset();

  lottoState.lottos = [];
  lottoState.money = 0;
});

const getWinningNumbers = () => {
  const numbers = WinningForm.getWinningNumbers();

  numbers.forEach((number) => {
    validatePositiveNumber(number);
    validateNumberLower(LOTTO.LOWER, number);
    validateNumberUpper(LOTTO.UPPER, number);
  });
  validateNotDuplicated(numbers);
  validateArrayLength(numbers, LOTTO.COUNT);

  return numbers;
};

const getBonusNumber = () => {
  const number = WinningForm.getBonusNumber();

  validatePositiveNumber(number);
  validateNumberLower(LOTTO.LOWER, number);
  validateNumberUpper(LOTTO.UPPER, number);

  return number;
};
