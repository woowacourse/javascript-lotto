export const appendElement = (parentElement, ...childElement) => {
  childElement.forEach((element) => document.querySelector(`${parentElement}`).appendChild(element));
};

export const removeElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) element.remove();
};

export const clearElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = "";
};
