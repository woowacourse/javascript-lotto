const showWinningNumberForm = (isValid) => {
  const winningNumberForm = $('#winning-number-form');
  winningNumberForm.style.display = isValid ? 'block' : 'none';
};
export default showWinningNumberForm;
