export function createDOMElement(tag, text = '') {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}
