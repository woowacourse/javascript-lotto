export default function createElement(type, text) {
  const element = document.createElement(type);
  element.innerText = text;
  return element;
}
