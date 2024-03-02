class WebCloseController {
  static playWebClose() {
    const $winningResultModal = document.querySelector('.winningResultModal');
    $winningResultModal.classList.remove('winningResultModal-visible');

    const $winningResult = document.querySelector('.winningResult');
    $winningResult.classList.remove('winningResult-visible');
  }
}

export default WebCloseController;
