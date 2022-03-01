export default class View {
  constructor(inputInstance) {
    this.inputInstance = inputInstance;
  }

  render(renderingData) {}

  getInputValue() {
    return this.inputInstance.getValue();
  }

  setInputValue(value) {
    this.inputInstance.setValue(value);
  }
}
