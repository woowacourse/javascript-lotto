export const Button = (label, onClick) => {
  const button = document.createElement("button");
  button.classList.add("large-button");
  button.textContent = label;

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
};
