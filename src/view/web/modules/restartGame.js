const restartGame = () => {
  const restartButton = document.querySelector(".restart-button");
  const body = document.querySelector("body");

  restartButton.addEventListener("click", () => {
    location.replace(location.href);
  });
};

export default restartGame;
