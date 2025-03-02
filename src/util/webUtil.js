export function setTagsDisabled($tags, bool) {
  $tags.forEach((tag) => {
    tag.disabled = bool;
  });
}

export function createElement({ tag, className, text }) {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (text) element.textContent = text;
  return element;
}

export function focusFirstNode($nodes) {
  $nodes[0].focus();
}

export function initNodes($nodes) {
  Array.from($nodes).forEach(($node) => {
    initNode($node);
  });
}

export function initNode($node) {
  $node.disabled = false;
  $node.value = "";
}
