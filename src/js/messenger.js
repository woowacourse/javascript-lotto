class Messenger {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  deliverMessage = ({ message, to, params }) => {
    const deliver = this.deliveryManual[to][message];
    deliver(params);
  };

  deliveryManual = {
    model: {
      INPUT_CASH: (cash) => {
        try {
          this.model.buyLotto(cash);
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
