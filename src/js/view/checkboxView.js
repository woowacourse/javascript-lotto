import { $ } from '../utils/selector';

export default class CheckBoxView {
  constructor() {
    this.$checkBox = $('#view-checkbox');
  }

  bindCheckBoxEvent(callback) {
    this.$checkBox.addEventListener('change', callback);
  }
}
