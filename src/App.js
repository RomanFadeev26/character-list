import React from 'react';
import asyncAxios from './utilities/asyncAxios';

class App extends React.PureComponent {
  
  componentDidMount() {
    asyncAxios({
      method: 'get',
      url: 'characters'
    }).fork(console.log, console.log);
  }

  render() {
    return (
      <div />
    );
  }
}

// function App() {
//   return (
//     <div />
//   );
// }

export default App;
