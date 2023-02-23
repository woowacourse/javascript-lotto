/* eslint-disable no-undef */

// import { judgeResult } from "../../../domain/judgeResult";

const modalEvent = () => {
  const modal = document.getElementById("game-modal");
  // const btn = document.getElementById("game-modal-open-button");
  const span = document.getElementsByClassName("game-modal-open-button")[0];

  // btn.onclick = function () {
  //   modal.style.display = "block";
  //   console.log(winningNumber);
  //   console.log(judgeResult(store.lottos, store.winningNumber));
  // };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

export default modalEvent;
