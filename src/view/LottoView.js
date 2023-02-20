const resultBtn = document.querySelector('.result__button');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close__button');

const onModalShow = () => {
  modal.classList.add('open');
};

const onModalClose = () => {
  modal.classList.remove('open');
};

resultBtn.addEventListener('click', onModalShow);
closeBtn.addEventListener('click', onModalClose);
