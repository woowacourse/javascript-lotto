const showErrorState = (textId, buttonId, error) => {
  const textArea = document.getElementById(textId);
  const buttonArea = document.getElementById(buttonId);
  textArea.textContent = error.message;
  textArea.classList.add('show');
  buttonArea.classList.add('disabled_button');
  buttonArea.disabled = true;
};

export default showErrorState;
