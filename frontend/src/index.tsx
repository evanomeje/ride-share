import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Element with ID 'root' not found in the DOM.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);