export const disableElement = (name) => {
  const element = document.querySelector(`[name=${name}]`);
  element.disabled = true;
};

export const enableElement = (name) => {
  const element = document.querySelector(`[name=${name}]`);
  element.disabled = false;
};
