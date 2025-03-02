const restartGame = () => {
  const restartButton = document.querySelector(".restart-button");

  restartButton.addEventListener("click", () => {
    location.replace(location.href);
  });
};

export default restartGame;
