global.beforeEach(() => {
  window.alert = jest.fn();

  HTMLDialogElement.prototype.showModal = jest.fn(function mock() {
    this.open = true;
  });

  HTMLDialogElement.prototype.close = jest.fn(function mock() {
    this.open = false;
  });
  
});

global.afterEach(() => {
  jest.restoreAllMocks();
});
