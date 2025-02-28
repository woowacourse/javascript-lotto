export const Alert = ({ message: message }) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.textContent = message;

  return alert;
};
