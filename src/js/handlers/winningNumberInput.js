const winningNumberInputHandler = ({ target }) => {
  if (
    !target.classList.contains('winning-number') &&
    !target.classList.contains('bonus-number')
  )
    return;

  if (Number(target.value) > 45 || Number(target.value) < 1) {
    alert('잘못된 숫자를 입력하셨습니다. 1~45 사이의 숫자를 입력해주세요.');
    target.value = '';
  }
  // target.value;
};

export default winningNumberInputHandler;
