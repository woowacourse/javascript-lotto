export const initializeInputValue = (targetInput) => {
  targetInput.value = '';
};

export const addClassNameHandler = (targetTag, className) => {
  targetTag.classList.add(className);
};

export const removeClassNameHandler = (targetTag, className) => {
  targetTag.classList.remove(className);
};

export const reloadPage = () => {
  window.location.reload();
};
