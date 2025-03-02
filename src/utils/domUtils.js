export const hideElement = (el) => {
  el.classList.add("hidden");
};

export const renderElement = (el) => {
  el.classList.remove("hidden");
};
