import InputView from '../view/InputView';
import LottoMachine from '../domain/LottoMachine';

class LottoController {

  async start() {
    const temp = await InputView.readMoney();
    const lottoMachine = new LottoMachine(8000);
  }
}

export default LottoController;