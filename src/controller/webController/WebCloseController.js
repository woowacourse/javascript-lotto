class WebCloseController {
  static playWebClose() {
    const $winningResultModal = document.querySelector('.winning-result-modal');
    $winningResultModal.classList.remove('visible');

    const $winningResult = document.querySelector('.winning-result');
    $winningResult.classList.remove('visible');
  }
}

export default WebCloseController;
