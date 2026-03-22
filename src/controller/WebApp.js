import LottoManager from "../service/LottoManager.js";
import PriceInputForm from "../web/components/PriceInputForm.js";
import LottoList from "../web/components/LottoList.js";
import WinningNumbersInputForm from "../web/components/WinningNumbersInputForm.js";
import GameResultDialog from "../web/components/GameResultDialog.js";

export default class WebApp {
  #manager = new LottoManager();
  #priceForm;
  #lottoList;
  #winningForm;
  #resultDialog;
  #lottoListSection;
  #winningSection;

  constructor() {
    this.#priceForm = new PriceInputForm({ onSubmit: this.#handlePurchaseSubmit.bind(this) });
    this.#resultDialog = new GameResultDialog({ onRestart: this.#handleRestart.bind(this) });
    this.#lottoListSection = document.querySelector('#lotto-list-section');
    this.#winningSection = document.querySelector('#winning-section');

    this.#priceForm.mount(document.querySelector('#purchase-section'));
    this.#resultDialog.mount(document.body);
  }

  #handlePurchaseSubmit(value) {
    try {
      const lottos = this.#manager.buyLottos(Number(value));
      this.#priceForm.clearError();

      if (this.#lottoList) this.#lottoList.unmount();
      if (this.#winningForm) this.#winningForm.unmount();

      this.#lottoList = new LottoList();
      this.#lottoList.mount(this.#lottoListSection);
      this.#lottoList.render(lottos);

      this.#winningForm = new WinningNumbersInputForm({
        onSubmit: this.#handleWinningSubmit.bind(this),
      });
      this.#winningForm.mount(this.#winningSection);
    } catch (error) {
      this.#priceForm.showError(error.message);
    }
  }

  #handleWinningSubmit({ winningNumbers, bonusNumber }) {
    try {
      this.#validateNumbers([...winningNumbers, bonusNumber]);
      const winningLotto = this.#manager.createWinningLotto(winningNumbers);
      const winningNumber = this.#manager.createWinningNumber(winningLotto, bonusNumber);
      const { prizeList, profitRate } = this.#manager.getLotteryResult(winningNumber);
      this.#winningForm.clearError();
      this.#resultDialog.open(prizeList, profitRate);
    } catch (error) {
      this.#winningForm.showError(error.message);
    }
  }

  #validateNumbers(numbers) {
    if (numbers.some((n) => !Number.isInteger(n))) {
      throw new Error("[ERROR] 로또 번호는 숫자여야 합니다.");
    }
  }

  #handleRestart() {
    this.#lottoList.unmount();
    this.#winningForm.unmount();
    this.#lottoList = null;
    this.#winningForm = null;
    this.#manager = new LottoManager();
    this.#priceForm.clearInput();
  }
}
