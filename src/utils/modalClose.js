import Dom from './Dom';

function clickCloseButton() {
  Dom.$('#close-btn').addEventListener('click', () => {
    Dom.$('.modal-dim-layer').style.display = 'none';
  });
}

function clickModalDimLayer() {
  Dom.$('.modal-dim-layer').addEventListener('click', () => {
    Dom.$('.modal-dim-layer').style.display = 'none';
  });
  Dom.$('.modal-container').addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

function listenModalClose() {
  clickCloseButton();
  clickModalDimLayer();
}

export default listenModalClose;
