export default function renderUI(elementId, position, func) {
  document.getElementById(elementId).insertAdjacentHTML(position, func);
}
