export const Prompt = ({ message }) => {
  const countPrompt = document.createElement("div");
  countPrompt.textContent = message;

  return countPrompt;
};
