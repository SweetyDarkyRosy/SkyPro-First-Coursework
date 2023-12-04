import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, RouterProvider, createHashRouter } from 'react-router-dom';

const router = createHashRouter([
	{
	  path: "/*",
	  element: <App />,
	}
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
	<React.StrictMode>
		<RouterProvider router={ router }/>
	</React.StrictMode>
);
