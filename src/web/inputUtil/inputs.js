import LottoGame from '../domains/LottoGame.js';
import InputChecker from '../validators/InputChecker.js';
import { getFormData } from '../utils/form.js';

const initLuckyNumbers = fields => {
  const luckyNumbersInput = Array.from(
    { length: 6 },
    (_, index) => fields[`lucky-number-${index + 1}`]
  );

  const luckyNumbers = InputChecker.checkLuckyNumbers(luckyNumbersInput);

  return luckyNumbers;
};

const initBonusNumber = (fields, luckyNumbers) => {
  const bonusNumberInput = fields['bonus-number'];

  const bonusNumber = InputChecker.checkBonusNumber(
    bonusNumberInput,
    luckyNumbers
  );

  return bonusNumber;
};

const initWinningNumbers = event => {
  const fields = getFormData(event.target);

  const luckyNumbers = initLuckyNumbers(fields);
  if (!luckyNumbers) {
    return;
  }

  const bonusNumber = initBonusNumber(fields, luckyNumbers);
  if (!bonusNumber) {
    return;
  }

  LottoGame.initWinningNumbers({ luckyNumbers, bonusNumber });
  return true;
};

export default initWinningNumbers;
