const disableButton = (button) => {
  if (!button) return;
  button.disabled = true;
  button.style.backgroundColor = '#ccc';
  button.style.cursor = 'not-allowed';
};

export default disableButton;
