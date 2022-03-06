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
    INPUT_CASH: (cash) => this.machine.buyLotto(cash),
    INPUT_WINNER_NUMBER: (winnerNumbers) => this.machine.getNumberMatches(winnerNumbers),
    RESTART_APP: () => this.machine.resetData(),
  };
}

export default RequestHandler;
