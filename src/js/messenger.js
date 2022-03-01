class Messenger {
  constructor(view, machine) {
    this.view = view;
    this.machine = machine;
  }

  deliverMessage = ({ message, to, params }) => {
    const deliver = this.deliveryManual[to][message];
    deliver(params);
  };

  deliveryManual = {
    machine: {
      INPUT_CASH: (cash) => {
        try {
          this.machine.buyLotto(cash);
        } catch (error) {
          alert(error.message);
        }
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
