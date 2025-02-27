const resetWinningHistoryUI = () => {
  const winningCount = document.querySelectorAll(".winningCount");
  winningCount.forEach((count) => {
    count.textContent = "0개";
  });
};

export default resetWinningHistoryUI;
