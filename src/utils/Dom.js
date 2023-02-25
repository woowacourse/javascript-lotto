export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const open = ($target) => $target.classList.add('open');
export const close = ($target) => $target.classList.remove('open');

export const $budgetForm = $('.budget__form');
export const $budgetError = $('.budget-error');
export const $totalBudget = $('.total-budget');
export const $ticketsList = $('.tickets__list');

export const $winningContainer = $('.winning-container');
export const $winningForm = $('.winning__form');
export const $$winningNumbers = $$('#winning-number');
export const $bonusNumber = $('#bonus__number');
export const $winningError = $('.winning-error');

export const $modal = $('.modal');
export const $closeButton = $('.modal__button--close');

export const $$winningCounts = $$('.winning-count');
export const $yield = $('.yield');
export const $retry = $('.reset__button');
