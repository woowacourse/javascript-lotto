export const inputErrorChecker = (validator) => {
  try {
    validator();
  } catch (error) {
    return { state: true, message: error.message };
  }

  return { state: false, message: '' };
};

export const purchaseLottoErrorHandler = () => {
  const $errorContainer = document.querySelector('.purchase-enter-container');
  const $trigger = document.querySelector('#purchase-button');

  return { $errorContainer, $trigger };
};

export const printLottoResultErrorHandler = () => {
  const $errorContainer = document.querySelector('.number-container');
  const $trigger = document.querySelector('#check-result');

  return { $errorContainer, $trigger };
};
