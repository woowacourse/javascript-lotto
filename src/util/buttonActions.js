export const buttonDisabled = (name) => {
  const button = document.querySelector(`[name=${name}]`);
  button.disabled = true;
};

export const buttonAbled = (name) => {
  const button = document.querySelector(`[name=${name}]`);
  button.disabled = false;
};
