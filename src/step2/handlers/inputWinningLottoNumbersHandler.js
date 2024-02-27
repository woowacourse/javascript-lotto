import { winningLotto } from '../instances.js';
import LOTTO_SETTING from '../../Constants/lottoSetting.js';

const winningNumbers = [];

const focusNextInput = ({ index, winningLottoInputs }) => {
  if (index + 1 < winningLottoInputs.length) {
    winningLottoInputs[index + 1].focus();
  }
};

const setBonusNumber = (bonusNumber) => {
  winningLotto.setBonusNumber(bonusNumber);
};

const totalWinningLottoNumbersHandler = ({ input, index, winningLottoInputs }) => {
  const winningNumber = Number(input.value);

  if (index < LOTTO_SETTING.VALID_LENGTH) {
    focusNextInput({ index, winningLottoInputs });
    winningNumbers.push(winningNumber);
  }

  if (winningNumbers.length === LOTTO_SETTING.VALID_LENGTH) {
    winningLotto.setWinLottoNumbers(winningNumbers);
  }

  if (index === LOTTO_SETTING.VALID_LENGTH) {
    setBonusNumber(winningNumber);
    input.blur();
  }
};

export const inputWinningLottoNumbersHandler = ({ input, index, winningLottoInputs }) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      totalWinningLottoNumbersHandler({ input, index, winningLottoInputs });
    }
  });
};
