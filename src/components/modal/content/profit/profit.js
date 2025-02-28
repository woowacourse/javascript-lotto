import createDomElement from '../../../../utils/createDomElement';

const $profit = (revenueRate) => {
  const profit = createDomElement('div', {
    className: 'profit_result',
  });

  const profitText = createDomElement('b', {
    textContent: `당신의 총 수익률은 ${revenueRate.toLocaleString()}%입니다.`,
  });
  profit.appendChild(profitText);

  return profit;
};

export default $profit;
