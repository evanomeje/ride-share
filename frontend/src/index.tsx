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
    <p className="mt-6 space-y-7 text-sm text-black">
        <em>Rides</em>
        &nbsp;  is my take on building and visualizing a distributed system. Read more @
        <a
          className="text-blue-500 hover:text-blue-600 transition-colors"
          href="https://evanomeje.xyz/"
          target="_blank"
          rel="noreferrer"
        >
          &nbsp;evanomeje.xyz
        </a>
      </p>
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