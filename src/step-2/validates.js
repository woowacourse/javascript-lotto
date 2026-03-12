export const validatePurchaseAmountInput = (userInput) => {
  if (userInput.trim() === '') {
    throw new Error('구입 금액은 필수 입력값입니다.');
  }

  const amountNumber = Number(userInput);
  if (Number.isNaN(amountNumber) || amountNumber <= 0) {
    throw new Error('구입 금액은 양수여야 합니다.');
  }
};
