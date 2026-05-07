import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GeoMap from './GeoMap';
import ErrorPage from './error-page';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import disableReactDevTools from './disableReactDevTools.js';

disableReactDevTools();

const MapView = () => (
  <div className="view-map">
    <GeoMap />
    <div className="description">
      <div className="mt-6 space-y-2 text-center">
        <p className="text-sm font-medium text-gray-900">
          Distributed ride-matching simulation
        </p>
        <div className="text-xs text-gray-500 space-x-1">
          <span>Go</span>
          <span>•</span>
          <span>React</span>
          <span>•</span>
          <span>PostgreSQL</span>
          <span>•</span>
          <span>Docker</span>
        </div>
        <div className="pt-2">
          <a
            href="https://github.com/evanomeje/ride-share"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.3-.535-1.52.115-3.16 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.295-1.23 3.295-1.23.65 1.64.24 2.86.12 3.16.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.82 1.1.82 2.22 0 1.6-.015 2.89-.015 3.28 0 .32.215.7.83.58C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View source on GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
);

const SystemDesignView = () => <h1>System Design View</h1>;

const MonitorView = () => (
  <div className="relative w-full h-full">
    <iframe
      src=""   //deal with later
      className="
      w-full
      h-full
      "
    />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: async ({ request }) => {
      if (request.url.endsWith('/')) return redirect('/map');
      return null;
    },
    children: [
      {
        path: 'map',
        element: <MapView />,
      },
      {
        path: 'monitor',
        element: <MonitorView />,
      },
      // {
      //   path: 'system-design',
      //   element: <SystemDesignView />,
      // },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);