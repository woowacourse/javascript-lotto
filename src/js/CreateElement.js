class CreateElement {
  #stackedTags;

  constructor(parentTag = "div") {
    this.#stackedTags = document.createElement(parentTag);
  }

  createNewTag(tagName, { contents, className }) {
    const newElement = document.createElement(tagName);

    if (className) newElement.classList.add(className);
    newElement.textContent = contents;

    this.#stackedTags.appendChild(newElement);
  }

  get tags() {
    return this.#stackedTags.outerHTML;
  }
}

export default CreateElement;
