import prizeResultContents from "./prizeResult.html?raw";

const createPrizeResultModal = () => {
  const targetParent = document.getElementById("main-container");
  targetParent.insertAdjacentHTML("beforeend", prizeResultContents);
};

export default createPrizeResultModal;
