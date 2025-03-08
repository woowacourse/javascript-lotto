const showResult = ({ winningHistory, rate }) => {
  updateWinningHistoryUI(winningHistory);

  updateRateUI(rate);

  showDialog();
};

const updateWinningHistoryUI = (winningHistory) => {
  Object.entries(winningHistory).forEach(([key, value]) => {
    if (value === 0) return;
    const countDiv = document.querySelector(`#rank${key}WinningCount`);
    countDiv.textContent = `${value}개`;
  });
};

const showDialog = () => {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
};

const updateRateUI = (rate) => {
  const rateDiv = document.querySelector("#modal__rate");
  rateDiv.textContent = `당신의 총 수익률은 ${rate.toFixed(1)}%입니다.`;
};

export default showResult;
