import Navigo from 'navigo'; // When using ES modules.
import { render } from 'preact';
import queryString from 'query-string';
import Multiplication from './multiplication';
import Addition from './addition';

function load() {
  const router = new Navigo('/demos/base');
  router
    .on('/', (match) => {
      const { url, query} = queryString.parseUrl(`${match.hashString}`, {
        parseNumbers: true,
      });

      console.log(query);
      switch (url) {
        case 'multiplication':
          render(<Multiplication multiplicant={query.cant} multiplier={query.lier} />, document.querySelector('.app'))
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
