import { LOTTO_NUMBER_SPLITER } from "../../constants/constant";
import generateAnswerLotto from "../../domain/generateAnswerLotto";
import parseAndValidateBonusNumber from "../../domain/processors/parseAndValidateBonusNumber";
import parseAndValidateWinningNumbers from "../../domain/processors/parseAndValidateWinningNumbers";
import profitCalculator from "../../domain/profitCalculator/profitCalculator";
import DomSelector from "../../utils/domSelector";

const handleWinningCheck = (purchaseAmount, lottoPack) => {
  try {
    const winning_numbers = DomSelector.winningNumbers;
    const bonus_number = DomSelector.bonusNumber;
    const statistics_rows = DomSelector.statisticsRows;
    const profit_rate = DomSelector.profitRate;
    const lotto_result_modal = DomSelector.lottoResultModal;

    // 도메인 로직
    const { winningNumbersInput, bonusNumberInput } = getAnswerLottoInput(winning_numbers, bonus_number);
    const { winningNumbers, bonusNumber } = parseAndValidatAnswerLotto(winningNumbersInput, bonusNumberInput);
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);
    const winningResult = lottoPack.compareAndReturnResult(answerLotto);

    // ui 로직
    updateStatistics(statistics_rows, winningResult);
    updateProfitRate(profit_rate, { purchaseAmount, winningResult });
    lotto_result_modal.showModal();
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

const updateStatistics = (statistics_rows, winningResult) => {
  statistics_rows.forEach((row) => {
    const price = row.querySelector(".price").textContent;
    const matchedKey = Object.keys(winningResult).find((key) => key.includes(price));
    if (matchedKey) {
      row.querySelector(".user_count").textContent = `${winningResult[matchedKey]}개`;
    }
  });
};

const updateProfitRate = (profit_rate, { purchaseAmount, winningResult }) => {
  const profitRate = profitCalculator(purchaseAmount, winningResult);
  profit_rate.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
};

export default handleWinningCheck;
