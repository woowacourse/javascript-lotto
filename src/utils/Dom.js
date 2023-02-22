export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const open = ($target) => $target.classList.add('open');
export const close = ($target) => $target.classList.remove('open');

export const $budgetForm = $('.budget__form');
export const $budgetError = $('.budget__error');
export const $totalBudget = $('.total__budget');
export const $ticketsList = $('.tickets__list');

export const $winningForm = $('.winning__form');
export const $$winningNumbers = $$('#winning__number');
export const $bonusNumber = $('#bonus__number');
export const $winningError = $('.winning__error');

export const $modal = $('.modal');
export const $closeButton = $('.close__button');

export const $$winningCounts = $$('.winning__count');
export const $yield = $('.yield');
