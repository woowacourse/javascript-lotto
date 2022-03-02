class Messenger {
  constructor(view, purchaseMachine, winnerMachine) {
    this.view = view;
    this.purchaseMachine = purchaseMachine;
    this.winnerMachine = winnerMachine;
  }

  deliverMessage = ({ message, to, params }) => {
    const deliver = this.deliveryManual[to][message];
    deliver(params);
  };

  deliveryManual = {
    purchaseMachine: {
      INPUT_CASH: (cash) => {
        try {
          this.purchaseMachine.buyLotto(cash);
        } catch (error) {
          alert(error.message);
        }
      },
    },
    winnerMachine: {
      WINNER_NUMBER_INPUT: (winnerNumbers) => {
        try {
          this.winnerMachine.setWinnerNumbers(winnerNumbers);
        } catch (error) {
          alert(error.message);
        }
      },
      LOTTO_GENERATE_COMPLETE: (lottos) => {
        this.winnerMachine.receiveLottos(lottos);
      },
    },
    view: {
      LOTTO_GENERATE_COMPLETE: (lottos) => {
        this.view.renderLottos(lottos);
      },
    },
  };
}

export default Messenger;
