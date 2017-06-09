import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import registerServiceWorker from './registerServiceWorker';

const app = <Layout chat={false} />;

ReactDOM.render(app, document.getElementById('wrap'));
registerServiceWorker();
