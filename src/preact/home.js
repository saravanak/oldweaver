import { Component } from 'preact';

class Home extends Component {
  render() {
    return (
      <div>
      <h1>These Demos are made in Preact.</h1>
      <ul>
        {[{slug: 'multiplication', label:'Multiplication Steps'}].map((meta) => {
          return <li> <a href={`#${meta.slug}`}>{meta.label}</a> </li>
        })}
      </ul>
      </div>
    );
  }
}

export default Home;
