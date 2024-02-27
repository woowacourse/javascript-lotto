import '../css/header.css';
import '../css/footer.css';

const RenderingHandler = Object.freeze({
  renderHeader: () => {
    const app = document.getElementById('app');
    const headerElement = document.createElement('header');
    headerElement.innerText = '🎱 행운의 로또';

    app.appendChild(headerElement);
  },

  renderFooter: () => {
    const app = document.getElementById('app');
    const footerElement = document.createElement('footer');
    footerElement.innerText = 'Copyright 2023. woowacourse';

    app.appendChild(footerElement);
  },
});

export default RenderingHandler;
