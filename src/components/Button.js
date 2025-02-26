export const Button = ({ label, onClick, style = "large" }) => {
  const button = document.createElement("button");
  button.classList.add(setButtonCss(style));
  button.textContent = label;

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
};

const setButtonCss = (style) => {
  if (style === "large") {
    return "large-button";
  }
  if (style === "small") {
    return "small-button";
  }
};
