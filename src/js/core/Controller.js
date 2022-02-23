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
  }

  updateView(message) {
    this.view.update(message);
  }

  bindEventHandlers() {}
}
