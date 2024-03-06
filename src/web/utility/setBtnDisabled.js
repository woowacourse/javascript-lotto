export const setBtnDisabled = (btnEl) => {
  btnEl.disabled = true;
  btnEl.style.setProperty("--btn-cursor", "not-allowed");
  btnEl.style.setProperty("--button-background-color", "#B4B4B4");
};
