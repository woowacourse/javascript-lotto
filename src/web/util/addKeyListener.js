export const addKeyListener = (selector, callback, key) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === key) {
        e.preventDefault();
        input.blur();
        callback();
      }
    });
  });
};
