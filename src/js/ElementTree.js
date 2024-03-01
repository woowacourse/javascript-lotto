class ElementTree {
  #stackedTags;
  #tmpStackedTag;

  constructor(parentTag = "div") {
    this.#stackedTags = document.createElement(parentTag);
  }

  #createNewElement(tagName, contents, attrs) {
    const newElement = document.createElement(tagName);

    if (contents) newElement.textContent = contents;
    if (!attrs) return newElement;

    Object.entries(attrs).forEach(([key, value]) => {
      if (key === "class") newElement.classList.add(value);
      else if (key === "onClick" && typeof value === "function")
        newElement.addEventListener("click", value);
      else newElement.setAttribute(key, value);
    });

    return newElement;
  }

  createNewTag(tagName, contents, attrs) {
    const newElement = this.#createNewElement(tagName, contents, attrs);

    this.#stackedTags.appendChild(newElement);
  }

  generateTmpStack(tagName, contents, attrs) {
    const newElement = document.createElement(tagName);

    if (contents) newElement.textContent = contents;
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === "class") newElement.classList.add(value);
        else if (key === "onClick" && typeof value === "function")
          newElement.addEventListener("click", value);
        else newElement.setAttribute(key, value);
      });
    }

    this.#tmpStackedTag = newElement;
  }

  pushTmpTag(tagName, contents, attrs) {
    if (!this.#tmpStackedTag) return;

    const newElement = this.#createNewElement(tagName, contents, attrs);

    this.#tmpStackedTag.appendChild(newElement);
  }

  flushTmpTag() {
    this.#stackedTags.appendChild(this.#tmpStackedTag);

    this.#tmpStackedTag = null;
  }

  get tags() {
    return this.#stackedTags;
  }
}

export default ElementTree;
