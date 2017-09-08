import React from 'react';
import ReactDOM from 'react-dom';
import AppHoc from './appUsingHoc';
import AppComponent from './appUsingOfflineComponent';

const App = () => (
  <div>
    <h2>Using HoC</h2>
    <AppHoc />
    <h2>Using Render-Prop Component</h2>
    <AppComponent />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#app'));
