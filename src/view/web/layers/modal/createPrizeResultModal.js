import prizeResultModalContents from "./prizeResultModal.html?raw";

const createPrizeResultModal = () => {
  const targetParent = document.getElementById("main-container");
  targetParent.insertAdjacentHTML("beforeend", prizeResultModalContents);
};

export default createPrizeResultModal;
