export const Prompt = ({ message, style }) => {
  const countPrompt = document.createElement("pre");
  countPrompt.textContent = message;
  countPrompt.classList.add("font-body");

  if (style === "warning") {
    countPrompt.classList.add("warning");
    countPrompt.classList.add("font-body");
  }

  return countPrompt;
};
