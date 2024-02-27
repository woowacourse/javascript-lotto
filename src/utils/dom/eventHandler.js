const eventHandler = {
  restart() {
    const $purchaseSection = document.getElementById('purchaseResultSection');
    const $winningNumberSection = document.getElementById('winningNumberSection');
    const $lottoNumberForm = document.getElementById('lottoNumberForm');
    const $purchaseForm = document.getElementById('purchaseForm');
    $purchaseForm.reset();
    $purchaseSection.replaceChildren();
    $winningNumberSection.classList.add('hidden');
    $lottoNumberForm.reset();
  },
};

export default eventHandler;
