export const clearState = (node) => {
  node.classList.remove('success', 'error');
}

export const showNode = (selectors) => {
  selectors.forEach((selector) => {
    const node = document.querySelector(selector);
    node.classList.remove('hidden');
  });
}
