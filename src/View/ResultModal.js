const ResultModal = {
  renderResult(allRankCount, rate) {
    document.getElementById("rank-5th").textContent = `${allRankCount.FIFTH}개`;
    document.getElementById("rank-4th").textContent =
      `${allRankCount.FOURTH}개`;
    document.getElementById("rank-3rd").textContent = `${allRankCount.THIRD}개`;
    document.getElementById("rank-2nd").textContent =
      `${allRankCount.SECOND}개`;
    document.getElementById("rank-1st").textContent = `${allRankCount.FIRST}개`;

    document.getElementById("profit-rate-value").textContent = rate;
  },

  show() {
    document.getElementById("modal-overlay").classList.remove("hidden");
  },

  close() {
    document.getElementById("modal-overlay").classList.add("hidden");
  },

  reset() {
    document.getElementById("rank-5th").textContent = "0개";
    document.getElementById("rank-4th").textContent = "0개";
    document.getElementById("rank-3rd").textContent = "0개";
    document.getElementById("rank-2nd").textContent = "0개";
    document.getElementById("rank-1st").textContent = "0개";
    document.getElementById("profit-rate-value").textContent = "0";
    this.close();
  },

  bindClose(handler) {
    document.getElementById("modal-close").addEventListener("click", handler);
  },

  bindRestart(handler) {
    document.getElementById("restart-btn").addEventListener("click", handler);
  },
};

export default ResultModal;
