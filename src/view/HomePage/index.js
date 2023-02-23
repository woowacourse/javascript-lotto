class HomePage {
  #template = /* html */ `
  <header>
    <h1>🎱 행운의 로또</h1>
  </header>
  <section class="check-winning-section"></section>
  <footer>
    <p class="copyright">Copyright 2023. woowacourse</p>
  </footer>
  <div class="modal hidden"></div>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
  }
}

export default HomePage;
