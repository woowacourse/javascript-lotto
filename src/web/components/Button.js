const setButtonCss = (style) => {
  if (style === "large") {
    return "large-button";
  }
  if (style === "small") {
    return "small-button";
  }
};

export const Button = ({ label, onClick, style = "large", name }) => {
  const button = document.createElement("button");
  button.classList.add("font-weight-body");
  button.classList.add(setButtonCss(style));
  button.textContent = label;
  button.name = name;

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  return button;
};
