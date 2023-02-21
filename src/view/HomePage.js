class HomePage {
  #template = /* html */ `
  <header>
    <h1>🎱 행운의 로또</h1>
  </header>
  <div class="container"></div>
  <footer>
    <p class="copyright">Copyright 2023. woowacourse</p>
  </footer>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.innerHTML = this.#template;
  }
}

export default HomePage;
