export const Alert = ({ message: message }) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("font-body");

  alert.textContent = message;

  return alert;
};
