const showSuccessState = (textId, buttonId) => {
  const textArea = document.getElementById(textId);
  const buttonArea = document.getElementById(buttonId);
  textArea.textContent = '';
  textArea.classList.remove('show');
  buttonArea.classList.remove('disabled_button');
  buttonArea.disabled = false;
};

export default showSuccessState;
