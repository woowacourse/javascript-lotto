const render = (selector, content) => {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Selector ${selector}에 해당하는 요소가 없습니다.`);
  }
  element.innerHTML = content;
};

export default render;
