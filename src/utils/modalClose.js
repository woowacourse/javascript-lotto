import Dom from './Dom';

function activeModalCloseButton() {
  Dom.$('#close-btn').addEventListener('click', () => {
    Dom.$('.modal-dim-layer').style.display = 'none';
  });
}

export default activeModalCloseButton;
