import { LOTTO_NUMBER_SPLITER } from "../../constants/constant";
import generateAnswerLotto from "../../domain/generateAnswerLotto";
import parseAndValidateBonusNumber from "../../domain/processors/parseAndValidateBonusNumber";
import parseAndValidateWinningNumbers from "../../domain/processors/parseAndValidateWinningNumbers";
import profitCalculator from "../../domain/profitCalculator/profitCalculator";
import DomUpdator from "../../utils/DomUpdator";
import DomSelector from "../../utils/domSelector";
import WebView from "../../view/WebView";

const handleWinningCheck = (purchaseAmount, lottoPack) => {
  const winning_numbers = DomSelector.winningNumbers;
  const bonus_number = DomSelector.bonusNumber;
  const statistics_rows = DomSelector.statisticsRows;
  const profit_rate = DomSelector.profitRate;
  const lotto_result_modal = DomSelector.lottoResultModal;

  try {
    // 도메인 로직
    const { winningNumbersInput, bonusNumberInput } = getAnswerLottoInput(winning_numbers, bonus_number);
    const { winningNumbers, bonusNumber } = parseAndValidatAnswerLotto(winningNumbersInput, bonusNumberInput);
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);
    const winningResult = lottoPack.compareAndReturnResult(answerLotto);
    const profitRate = profitCalculator(purchaseAmount, winningResult);

    // ui 로직
    WebView.updateStatistics(statistics_rows, winningResult);
    WebView.updateProfitRate(profit_rate, profitRate);
    DomUpdator.showModal(lotto_result_modal);
  } catch (error) {
    alert(error);
  }
};

const getAnswerLottoInput = (winning_numbers, bonus_number) => {
  const winningNumbersInput = [];
  winning_numbers.forEach((element) => {
    winningNumbersInput.push(element.value);
  });
  const bonusNumberInput = bonus_number.value;
  return { winningNumbersInput, bonusNumberInput };
};

const parseAndValidatAnswerLotto = (winningNumbersInput, bonusNumberInput) => {
  const winningNumbers = parseAndValidateWinningNumbers(winningNumbersInput.join(LOTTO_NUMBER_SPLITER));
  const parseAndValidateBonusNumberFunc = parseAndValidateBonusNumber(winningNumbers);
  const bonusNumber = parseAndValidateBonusNumberFunc(bonusNumberInput);
  return { winningNumbers, bonusNumber };
};

export default handleWinningCheck;
