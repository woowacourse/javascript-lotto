const Alert = {
  show(message, otherClasses = '') {
    const [alertDiv] = document.getElementsByClassName(['alert', otherClasses].join(' '));
    alertDiv.querySelector('p').innerHTML = `${message}`;
    alertDiv.style.display = 'flex';

    alertDiv.classList.remove('animation-shake');
    (() => alertDiv.offsetWidth)();
    alertDiv.classList.add('animation-shake');
  },

  hide(otherClasses = '') {
    const [alertDiv] = document.getElementsByClassName(['alert', otherClasses].join(' '));
    alertDiv.style.display = 'none';
  },
};

export default Alert;
