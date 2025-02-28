import createDomElement from '../../../../utils/createDomElement';

const $lottoInputTitle = (PRIZE_TITLE) => {
  const lottoInputTitle = createDomElement('div', {
    className: 'lotto_input_title',
  });

  PRIZE_TITLE.forEach((text) => {
    const lottoInputTitleText = createDomElement('span', {
      textContent: text,
    });
    lottoInputTitle.appendChild(lottoInputTitleText);
  });

  return lottoInputTitle;
};
export default $lottoInputTitle;
