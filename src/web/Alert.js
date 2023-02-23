const Alert = {
  show(message, otherClasses = '') {
    const [alertDiv] = document.getElementsByClassName(['alert', otherClasses].join(' '));
    alertDiv.querySelector('p').innerHTML = `${message}`;
    alertDiv.style.display = 'flex';
  },

  hide(otherClasses = '') {
    const [alertDiv] = document.getElementsByClassName(['alert', otherClasses].join(' '));
    alertDiv.style.display = 'none';
  },
};

export default Alert;
