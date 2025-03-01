export const setErrorMessage = (message, tag) => {
  if (typeof document !== 'undefined') {
    const dom = document.getElementById(tag);
    if (dom) {
      dom.textContent = message;
    }
  }
};
