const appendTextElement = (parent, textContent) => {
  const textElement = document.createElement("div");
  textElement.classList.add("text");
  textElement.textContent = textContent;
  parent.appendChild(textElement);
};

export default appendTextElement;
