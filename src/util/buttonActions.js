export const disabledButton = (name) => {
  const button = document.querySelector(`[name=${name}]`);
  button.disabled = true;
};

export const enableButton = (name) => {
  const button = document.querySelector(`[name=${name}]`);
  button.disabled = false;
};
