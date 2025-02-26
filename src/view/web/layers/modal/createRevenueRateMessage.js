const createRevenueRateMessage = (revenueRate) => {
  document.getElementById("revenue-rate-message").textContent =
    `당신의 총 수익률은 ${revenueRate}% 입니다.`;
};

export default createRevenueRateMessage;
