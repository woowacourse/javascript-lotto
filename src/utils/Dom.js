function setAttributes(element, attribute) {
  Object.entries(attribute).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function setText(element, text) {
  const elementText = document.createTextNode(text);
  element.appendChild(elementText);
}

const Dom = {
  $: (selector) => document.querySelector(selector),
  $$: (selector) => document.querySelectorAll(selector),
  /**
   * content
   *
   * target: wrapper
   * tag: 태그
   * attribute: 속성들
   * text: 안에 들어갈 내용
   */
  createAppendTagNode: (content) => {
    const {
      target, tag, attribute, text,
    } = content;
    const article = Dom.$(target);
    const element = document.createElement(tag);
    if (attribute !== undefined) setAttributes(element, attribute);
    if (text !== undefined) setText(element, text);
    article.appendChild(element);
  },
};

export default Dom;
