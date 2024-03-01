import domSelector from '../util/dom';
const { generatedLottos, afterBuyLottos } = domSelector;

const outputView = {
  printAfterBuyLottos(ticketCount, lottos) {
    this.generatedLottosReset();
    this.printLottoPayment(ticketCount);
    this.printGeneratedLottos(lottos);
    afterBuyLottos.style.visibility = 'visible';
  },
  generatedLottosReset() {
    if (generatedLottos.hasChildNodes()) {
      afterBuyLottos.firstChild.remove();
      while (generatedLottos.firstChild) {
        generatedLottos.removeChild(generatedLottos.firstChild);
      }
    }
  },

  printLottoPayment(count) {
    const ticketCountParagraph = document.createElement('p');
    ticketCountParagraph.innerText = `총 ${count}개를 발행했습니다.`;
    afterBuyLottos.prepend(ticketCountParagraph);
  },

  printGeneratedLottos(lottos) {
    generatedLottos.innerHTML = `
      ${lottos.map((lotto) => `<li>${lotto.join(', ')}</li>`).join('')}`;
  },
};
export default outputView;
