import { REQUEST_MESSAGE } from './constants/constants';

class RequestHandler {
  constructor(view, machine) {
    this.view = view;
    this.machine = machine;
  }

  sendRequest = (message, params) => {
    const request = this.requestManual[message];
    const response = request(params);
    return response;
  };

  requestManual = this.generateRequestManual();

  generateRequestManual() {
    const manual = {};
    manual[REQUEST_MESSAGE.INPUT_CASH] = (cash) => this.machine.buyLotto(cash);
    manual[REQUEST_MESSAGE.INPUT_WINNER_NUMBER] = (winnerNumbers) => {
      this.machine.getNumberMatches(winnerNumbers);
    };
    manual[REQUEST_MESSAGE.RESTART_APP] = () => this.machine.resetData();

    return manual;
  }
}

export default RequestHandler;
