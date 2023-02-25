/* eslint-disable no-undef */

const modalEvent = () => {
  const modal = document.getElementById("game-modal");
  const span = document.getElementsByClassName("game-modal-close-button")[0];

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
