import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/* Fontawesome icons */
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

/* Bootstrap 5.1 */
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import 'react-loading-skeleton/dist/skeleton.css';

import App from './App';

import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
