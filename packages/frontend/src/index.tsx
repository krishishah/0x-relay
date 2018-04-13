import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './app/index.css';
import 'semantic-ui-css/semantic.min.css';

// Kovan is a test network
// Please ensure you have Metamask installed
// and it is connected to the Kovan test network
export const KOVAN_NETWORK_ID = 42;
export const KOVAN_RPC = 'https://kovan.infura.io';

export const TEST_RPC_NETWORK_ID = 50;
export const TEST_RPC = 'http://localhost:8545';

export const ETHER_TOKEN_SYMBOL = 'ETH';
export const ETHER_DECIMAL_PLACES = 18;

export const RELAYER_URL = 'ws://localhost:3001';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
