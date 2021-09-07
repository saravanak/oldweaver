import Navigo from 'navigo'; // When using ES modules.
import { render } from 'preact';
import queryString from 'query-string';
import Multiplication from './multiplication';
import Home from './home';

function load() {
  const router = new Navigo('/demos/base');
  router
    .on('/', (match) => {
      const { url, query} = queryString.parseUrl(`${match.hashString}`, {
        parseNumbers: true,
      });

      switch (url) {
        case 'multiplication':
          render(
              <div>
                  <a href="/demos/base"> Demo Home</a>
          <Multiplication multiplicant={query.cant} multiplier={query.lier} />
          </div>
          , document.querySelector('.app'))
          break;
        default:
          render(<Home />, document.querySelector('.app'))
          break;
      }
    })
    .resolve();
}

window.addEventListener('load', load);
window.addEventListener("hashchange", load);
