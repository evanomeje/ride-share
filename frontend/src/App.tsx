
import GeoMap from './GeoMap';

const App = () => {
  return (
    <div className="App">
      <GeoMap />
      <div className="description">
      <p className="mt-6 space-y-7 text-sm text-black">
          <em>Rides</em>
          &nbsp;is my take on building and visualizing a distributed system.
          Read more @
          <a
            className="text-blue-500 hover:text-blue-600 transition-colors"
            href="https://evanomeje.xyz"
            target="_blank"
            rel="noreferrer"
          >
            &nbsp;evanomeje.xyz
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
