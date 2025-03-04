import { LOTTO_NUMBER_SPLITER } from "../../constants/constant.js";
import generateAnswerLotto from "../../domain/generateAnswerLotto.js";
import parseAndValidateBonusNumber from "../../domain/processors/parseAndValidateBonusNumber.js";
import parseAndValidateWinningNumbers from "../../domain/processors/parseAndValidateWinningNumbers.js";
import profitCalculator from "../../domain/profitCalculator/profitCalculator.js";
import DomUpdator from "../../utils/DomUpdator.js";
import DomSelector from "../../utils/DomSelectors.js";
import WebView from "../../view/WebView.js";

const handleWinningCheck = (purchaseAmount, lottoPack) => {
  const winning_numbers = DomSelector.winningNumbers;
  const bonus_number = DomSelector.bonusNumber;
  const statistics_rows = DomSelector.statisticsRows;
  const profit_rate = DomSelector.profitRate;
  const lotto_result_modal = DomSelector.lottoResultModal;
  const error_modal = DomSelector.errorModal;

  try {
    // 도메인 로직
    const { winningNumbersInput, bonusNumberInput } = getAnswerLottoInput(winning_numbers, bonus_number);
    const { winningNumbers, bonusNumber } = parseAndValidateAnswerLotto(winningNumbersInput, bonusNumberInput);
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);
    const winningResult = lottoPack.compareAndReturnResult(answerLotto);
    const profitRate = profitCalculator(purchaseAmount, winningResult);

    // ui 로직
    WebView.updateStatistics(statistics_rows, winningResult);
    WebView.updateProfitRate(profit_rate, profitRate);
    DomUpdator.showModal(lotto_result_modal, true);
  } catch (error) {
    DomUpdator.content(error_modal, error);
    DomUpdator.showModal(error_modal, true);
  }
};

const getAnswerLottoInput = (winning_numbers, bonus_number) => {
  const winningNumbersInput = [...winning_numbers].map((element) => element.value);
  const bonusNumberInput = bonus_number.value;
  return { winningNumbersInput, bonusNumberInput };
};

const parseAndValidateAnswerLotto = (winningNumbersInput, bonusNumberInput) => {
  const winningNumbers = parseAndValidateWinningNumbers(winningNumbersInput.join(LOTTO_NUMBER_SPLITER));
  const parseAndValidateBonusNumberFunc = parseAndValidateBonusNumber(winningNumbers);
  const bonusNumber = parseAndValidateBonusNumberFunc(bonusNumberInput);
  return { winningNumbers, bonusNumber };
};

export default handleWinningCheck;
