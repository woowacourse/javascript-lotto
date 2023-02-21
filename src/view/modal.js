/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const modal = () => {
  const modal = document.getElementById("game-modal");

  const btn = document.getElementById("game-modal-open-button");

  const span = document.getElementsByClassName("game-modal-open-button")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

export default modal;
