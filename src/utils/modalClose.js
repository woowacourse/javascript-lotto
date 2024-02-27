import Dom from './Dom';

function activeModalCloseButton() {
  Dom.$('.close-btn').addEventListener('click', () => {
    Dom.$('.modal-wrapper').style.display = 'none';
  });
}

export default activeModalCloseButton;
