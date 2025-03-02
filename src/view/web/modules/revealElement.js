const revealElement = (targetSelector) => {
  const target = document.querySelector(targetSelector);
  target.classList.replace("invisible", "visible");
};

export default revealElement;
