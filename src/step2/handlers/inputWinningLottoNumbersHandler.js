import { winningLotto } from '../instances.js';
import LOTTO_SETTING from '../../Constants/lottoSetting.js';
import safeEventHandlerWithAlertError from '../utils/safeEventHandlerWithAlertError.js';
import { initializeInputValue } from './uiUtils.js';

const winningNumbers = [];

const focusNextInput = ({ index, winningLottoInputs }) => {
  if (index + 1 < winningLottoInputs.length) {
    winningLottoInputs[index + 1].focus();
  }
};

const setBonusNumber = (bonusNumber, input) => {
  safeEventHandlerWithAlertError(
    () => {
      winningLotto.setBonusNumber(bonusNumber);
    },
    (error) => {
      alert(error.message);
      initializeInputValue(input);
    },
  );
};

const totalWinningLottoNumbersHandler = ({ input, index, winningLottoInputs }) => {
  const winningNumber = Number(input.value);

  if (index < LOTTO_SETTING.VALID_LENGTH) {
    focusNextInput({ index, winningLottoInputs });
    winningNumbers.push(winningNumber);
  }

  if (winningNumbers.length === LOTTO_SETTING.VALID_LENGTH) {
    safeEventHandlerWithAlertError(
      () => {
        winningLotto.setWinLottoNumbers(winningNumbers);
      },
      (error) => {
        alert(error.message);
        winningLottoInputs.forEach((input) => {
          initializeInputValue(input);
        });
      },
    );
  }

  if (index === LOTTO_SETTING.VALID_LENGTH) {
    setBonusNumber(winningNumber, input);
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
