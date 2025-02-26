export const displayComponent = (parentElement, ...childElement) => {
  childElement.forEach((element) => document.querySelector(`${parentElement}`).appendChild(element));
};
