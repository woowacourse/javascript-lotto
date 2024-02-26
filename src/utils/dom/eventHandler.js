const eventHandler = {
  restart() {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    const $winningNumberSection = document.getElementById('winningNumberSection');
    const $lottoNumberWrapper = document.getElementById('lottoNumberWrapper');
    const $purchaseForm = document.getElementById('purchaseForm');
    $purchaseForm.reset();
    $purchaseSection.replaceChildren();
    $winningNumberSection.classList.add('hidden');
    $lottoNumberWrapper.reset();
  },
};

export default eventHandler;
