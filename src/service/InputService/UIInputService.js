import SELECTORS from '../../constants/Selectors.js';

export function getUIPurchasePrice() {
  const inputElement = document.getElementById(SELECTORS.INPUT.PURCHASE_PRICE);
  return inputElement ? inputElement.value : null;
}

export function getUIWinningNumber() {
  const winningNumbers = Array.from(
    document.querySelectorAll(`.${SELECTORS.INPUT.WINNING_NUMBER}`),
  );
  return winningNumbers.map((input) => input.value.trim()).join(',');
}

export function getUIBonusNumber() {
  const bonusNumber = document.getElementById(SELECTORS.INPUT.BONUS_NUMBER);

  return bonusNumber.value;
}

export async function getUIUserRetry() {
  return new Promise((resolve, reject) => {
    const retryButton = document.getElementById(SELECTORS.BUTTON.RETRY);

    const handleRetryClick = (event) => {
      event.preventDefault();
      retryButton.removeEventListener('click', handleRetryClick);
      resolve('y');
    };

    retryButton.addEventListener('click', handleRetryClick);
  });
}
