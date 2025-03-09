const disableButton = (button) => {
  button.disabled = true;
  button.style.backgroundColor = '#ccc';
  button.style.cursor = 'not-allowed';
};

const enableButton = (button) => {
  button.disabled = false;
  button.style.backgroundColor = ''; // 기본값으로 되돌리기
  button.style.cursor = ''; // 기본값으로 되돌리기
};

export { disableButton, enableButton };
