import Component from '../../Component.js';
import Inputs from '../../utils/Inputs.js';

export default class WinNumbers extends Component {
  async read() {
    const winningNumbers = await Inputs.readWinningNumbers();
    const bonusNumber = await Inputs.readBonusNumber();

    this.setter({ winningNumbers, bonusNumber });
  }

  setUp({ setter }) {
    this.setter = setter;
  }
}
