class App extends HTMLElement {
  constructor() {
    super();

    this.state = {
      lottos: [],
    };

    this.template = document.getElementById('');
  }

  connectedCallback() {
    // 다음 repaint 전에 수행할 일을 콜백 함수로 등록
    window.requestAnimationFrame(() => {
      this.#syncAttribute();
    });
  }

  #syncAttribute() {
    this.lottoItems.lottos = this.state.lottos;
  }
}

export default App;
