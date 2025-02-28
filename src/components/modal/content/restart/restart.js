import createDomElement from '../../../../utils/createDomElement';

const $restart = () => {
  const restart = createDomElement('button', {
    textContent: '다시 시작하기',
    id: 'restartButton',
  });

  return restart;
};

export default $restart;
