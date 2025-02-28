import createDomElement from '../../../../utils/createDomElement';

const $title = () => {
  const title = createDomElement('span', {
    className: 'rank_layer_title',
    textContent: '🏆 당첨 통계 🏆',
  });

  return title;
};

export default $title;
