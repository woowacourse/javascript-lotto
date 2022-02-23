export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.model.init((message) => {
      this.updateView(message);
    });

    this.bindEventHandlers();
    console.log('controller loaded...');
  }

  bindEventHandlers() {
    this.view.bindOnClickPaymentSubmit(this.purchase.bind(this));
    this.view.bindOnClickNumberToggle();
  }

  purchase(amount) {
    this.model.purchase(amount, (message) => {
      this.updateView(message);
    });
  }

  updateView(message) {
    this.view.update(message);
  }
}
