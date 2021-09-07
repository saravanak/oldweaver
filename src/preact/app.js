import Navigo from 'navigo'; // When using ES modules.
import { render } from 'preact';
import { Multiplication } from './multiplication';
import { Addition } from './addition';

function load() {
    const router = new Navigo('/demos/base');
    router
        .on('/', (match) => {
            console.log(match);
            switch (match.hashString) {
                case 'multiplication':
                    render(<Multiplication />, document.querySelector('.app'))
                    break;
                case 'addition':
                default:
                    render(<Addition />, document.querySelector('.app'))
                    break;

            }

        })
        .resolve();

}

window.addEventListener('load', load);
window.addEventListener("hashchange", load);
