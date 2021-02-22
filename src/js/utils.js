export const hideElement = ($target) => {
  $target.classList.add("d-none");
};

export const showElement = ($target) => {
  $target.classList.remove("d-none");
};

export const shuffle = (arr) => {
  for (let i = arr.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
};
