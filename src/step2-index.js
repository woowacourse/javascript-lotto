import '../reset.css';
import '../style.css';

import validator from './domain/validator';

const budgetForm = document.querySelector('.budget_form');
const budgetError = document.querySelector('.budget_error');

const step2 = document.querySelector('#step2');

const displayBudgetError = (message) => {
  budgetError.innerText = message;
  budgetError.style.visibility = 'visible';
};

const onSubmitBudgetForm = (event) => {
  event.preventDefault();
  const budget = event.target[0].value;
  try {
    validator.validateBudget(budget);
  } catch ({ message }) {
    return displayBudgetError(message);
  }
  budgetError.innerText = '';
  step2.style.visibility = 'visible';
};

budgetForm.addEventListener('submit', onSubmitBudgetForm);
