import FirstSection from './FirstSection.js';
import NextStepArticle from './NextSection.js';

export default function Main() {
  const main = document.createElement('main');
  main.classList.add('lotto-game-container');

  const article = document.createElement('article');
  article.appendChild(FirstSection());
  article.appendChild(NextStepArticle());

  main.appendChild(article);

  return main;
}
