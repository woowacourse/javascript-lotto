export const validatePurchaseAmountInput = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error('구입 금액은 필수 입력값입니다.');
  }

  const amountNumber = Number(userInput);
  if (Number.isNaN(amountNumber) || amountNumber <= 0) {
    throw new Error('구입 금액은 양수여야 합니다.');
  }
};

export const validateWinningNumber = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error('당첨 번호는 필수 입력값입니다.');
  }

  const winningNumber = Number(userInput);
  if (Number.isNaN(winningNumber)) {
    throw new Error('당첨 번호는 숫자여야 합니다.');
  }
};

export const validateBonusNumber = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error('보너스 번호는 필수 입력값입니다.');
  }

  const bonusNumber = Number(userInput);
  if (Number.isNaN(bonusNumber)) {
    throw new Error('보너스 번호는 숫자여야 합니다.');
  }
};
