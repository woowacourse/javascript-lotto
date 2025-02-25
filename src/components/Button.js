export const Button = (prompt) => {
  const resultButton = document.createElement("button");
  resultButton.classList.add("large-button");
  resultButton.textContent = prompt;

  return resultButton;
};
