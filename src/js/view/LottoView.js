export default class LottoView {
  show(...elements) {
    elements.forEach(element => element.classList.remove('d-none'));
  }

  hide(...elements) {
    elements.forEach(element => element.classList.add('d-none'));
  }
}
