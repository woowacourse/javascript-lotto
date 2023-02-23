const ModalWindow = {
  show(message = '&nbsp;') {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').innerHTML = message;
  },

  hide() {
    document.querySelector('.modal-message').innerHTML = '&nbsp;';
    document.querySelector('.modal-background').style.display = 'none';
  },

  addDomTree(tree) {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').appendChild(tree);
  },
};

export default ModalWindow;
