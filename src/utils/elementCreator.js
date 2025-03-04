export const appendContents = (parentSelector, childSelector, contents) => {
  const parentElement = document.querySelector(parentSelector);
  const childElement = parentElement.querySelector(childSelector);

  if (childElement) {
    parentElement.replaceChildren();
  }

  parentElement.insertAdjacentHTML("beforeend", contents);
};

export const prependContents = (parentSelector, childSelector, contents) => {
  const parentElement = document.querySelector(parentSelector);
  const childElement = parentElement.querySelector(childSelector);

  if (childElement) {
    parentElement.replaceChildren();
  }

  parentElement.insertAdjacentHTML("afterbegin", contents);
};

export const insertTextContents = (targetSelector, contents) => {
  const targetElement = document.querySelector(targetSelector);

  targetElement.textContent = contents;
};
