import './web/index.css';
import Header from './web/header/Header';
import Main from './web/main/Main';
import Footer from './web/footer/Footer';

const app = document.getElementById('app');

app.appendChild(Header());
app.appendChild(Main());
app.appendChild(Footer());
