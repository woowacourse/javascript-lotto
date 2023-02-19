import Component from './Component.js';
import Inputs from '../../utils/Inputs.js';

export default class WinNumbers extends Component {
  async read() {
    const winningNumbers = await Inputs.readWinningNumbers();
    const bonusNumber = await Inputs.readBonusNumber();
    const lottoList = this.lottoList.map((lotto) =>
      lotto.setDrawingNumbers({ winningNumbers, bonusNumber })
    );

    this.setter({ lottoList });
  }

  setUp({ lottoList, setter }) {
    this.setter = setter;
    this.lottoList = lottoList;
  }
}
