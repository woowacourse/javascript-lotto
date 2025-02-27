import './web/index.css';
import Header from './web/header/Header';
import Main from './web/main/Main';
import Footer from './web/footer/Footer';

const app = document.getElementById('app');

const appFragment = document.createDocumentFragment();

fragment.appendChild(Header());
fragment.appendChild(Main());
fragment.appendChild(Footer());

app.appendChild(appFragment);
