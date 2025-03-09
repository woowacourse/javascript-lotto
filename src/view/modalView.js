const modal = document.querySelector("dialog");
const modalCloseButton = document.getElementById("modal-close-button");
const modalRestartButton = document.getElementById("restart-button");

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

modalCloseButton.addEventListener("click", () => {
  modal.close();
});

const showModal = () => {
  modal.showModal();
}

const updateModalContent = (results) => {
  const resultRows = document.querySelectorAll(".modal-result-content");

  resultRows[0].children[2].textContent = `${results.rankCounts.fifth}개`;
  resultRows[1].children[2].textContent = `${results.rankCounts.fourth}개`;
  resultRows[2].children[2].textContent = `${results.rankCounts.third}개`;
  resultRows[3].children[2].textContent = `${results.rankCounts.second}개`;
  resultRows[4].children[2].textContent = `${results.rankCounts.first}개`;

  const winningResultP = document.querySelector(".winning-result p");
  winningResultP.textContent = `당신의 총 수익률은 ${results.profitRate}%입니다.`;
};

const restartModal = (restartFn) =>{
  modalRestartButton.addEventListener("click", () => {
    modal.close();
    restartFn();
  });
}

export { showModal, updateModalContent, restartModal };
