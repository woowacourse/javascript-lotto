class WebCloseController {
  static playWebClose() {
    const $winningResultModal = document.querySelector('.winning-result-modal');
    $winningResultModal.classList.remove('winning-result-modal_visible');

    const $winningResult = document.querySelector('.winning-result');
    $winningResult.classList.remove('winning-result_visible');
  }
}

export default WebCloseController;
