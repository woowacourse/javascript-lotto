import { View } from '../view/View.js';
import { LottoGame } from '../model/LottoGame.js';

export class Controller {
  constructor() {
    this.view = new View();
    this.lottoGame = new LottoGame();
    this.purchaseLotto();
    console.log(this.view.toggleBtn);
  }

  purchaseLotto() {
    this.view.purchaseBtn.addEventListener('click', (e) => {
      this.lottoGame.insertMoney(Number(this.view.moneyInput.value));
      this.lottoGame.buyLotto();
      this.clearMoneyInput();
      this.view.showLottos();
      this.view.showLottoIcons(this.lottoGame.lottoWallet);
      this.showDetailLottos();
    });
  }

  clearMoneyInput() {
    this.view.moneyInput.value = '';
    this.view.moneyInput.focus();
  }

  showDetailLottos() {
    this.view.toggleBtn.addEventListener('click', () => {
      if (this.view.toggleBtn.checked) {
        // 로또 번호까지 보여주고 세로로 정렬해요.
        this.view.lottosDetail(this.lottoGame.lottoWallet);
        return;
      }
      // 원래대로 돌아와요.
      this.showLottoIcons = document.getElementById('lotto-icons');
      this.showLottoIcons.innerHTML = '🎟️'.repeat(this.lottoGame.lottoWallet.length);
    });
  }
}
