const ModalWindow = {
  show(message = '') {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').textContent = message;
  },

  hide() {
    document.querySelector('.modal-message').textContent = '';
    document.querySelector('.modal-background').style.display = 'none';
  },

  addDomTree(tree) {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').appendChild(tree);
  },
};

export default ModalWindow;
