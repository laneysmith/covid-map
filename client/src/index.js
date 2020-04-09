import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from './components/Map';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Map />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
