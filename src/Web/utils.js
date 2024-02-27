export function makeElementWithClassName(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

export function appendChildren(parentElement, [...args]) {
  for (const arg of args) {
    parentElement.appendChild(arg);
  }
}
