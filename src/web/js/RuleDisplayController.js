const RuleDisplayController = {
  addEventToggleRule() {
    const toggleBtnElList = document.querySelectorAll('.btn-toggleRule');

    toggleBtnElList.forEach((el) =>
      el.addEventListener('click', (event) =>
        this.private_toggleRule(event).bind(this),
      ),
    );
  },

  private_toggleRule(event) {
    event.stopPropagation();

    const { name } = event.currentTarget;
    const targetRule = name.replace('btn-toggle-', '');
    const targetRuleEl = document.querySelector(`.${targetRule}`);

    targetRuleEl.classList.toggle('hidden');
  },
};

export default RuleDisplayController;
