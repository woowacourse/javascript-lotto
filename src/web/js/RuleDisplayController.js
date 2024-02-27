class RuleDisplayController {
  #toggleBtnElList = [];

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#toggleBtnElList = document.querySelectorAll('.btn-toggleRule');
  }

  #addEvent() {
    this.#toggleBtnElList.forEach((el) =>
      el.addEventListener('click', (event) => this.#toggleRule(event)),
    );
  }

  #toggleRule(event) {
    const { name } = event.currentTarget;
    const targetRule = name.replace('btn-toggle-', '');
    const targetRuleEl = document.querySelector(`.${targetRule}`);

    targetRuleEl.classList.toggle('hidden');
  }
}

export default RuleDisplayController;
// eslint-disable-next-line
const ruleDisplayController = new RuleDisplayController();
