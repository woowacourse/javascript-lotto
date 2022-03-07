export const setDelay = (millisecond) =>
  new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
