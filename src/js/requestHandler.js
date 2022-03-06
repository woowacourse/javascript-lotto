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

  requestManual = {
    [REQUEST_MESSAGE.INPUT_CASH]: (cash) => this.machine.buyLotto(cash),
    [REQUEST_MESSAGE.INPUT_WINNER_NUMBER]: (winnerNumbers) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      this.machine.getNumberMatches(winnerNumbers),
    [REQUEST_MESSAGE.RESTART_APP]: () => this.machine.resetData(),
  };
}

export default RequestHandler;
