import React from 'react';
import Car from './Car';
import obstacles from './obstacles';
import { api } from './api';
import { wait } from './utils';

import config from './config';
import CustomerIcon from './CustomerIcon';
const {
  gridSize,
  squareSize,
  fetchInterval,
} = config;

const coordsToObstacles = {};
obstacles.forEach(([xStart, xEnd, yStart, yEnd, color]) => {
  let x = xStart;
  while (x <= xEnd) {
    let y = yStart;
    while (y <= yEnd) {
      coordsToObstacles[`${x}:${y}`] = color || '#c1c3c7';
      y += 1;
    }
    x += 1;
  }
});

const pathCoords = [];
const roadRects = [];
for (let x = 0; x < 50; x++) {
  for (let y = 0; y < 50; y++) {
    if (!coordsToObstacles[`${x}:${y}`]) {
      roadRects.push(
        <rect
          key={`${x}:${y}`}
          width={squareSize}
          height={squareSize}
          x={x * squareSize}
          y={y * squareSize}
          fill="white"
          onClick={() => {
            pathCoords.push([x, y]);
            console.log(JSON.stringify(pathCoords));
          }}
        />
      );
    }
  }
}


export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.previousUpdateAt = Date.now();
    this.state = {
      cars: [],
      customers: [],
      refreshing: false,
    };
  }

  async loadData() {
    while (true) {
      const rides = await api.get('/rides');

      const timeout = 2000;
      const now = Date.now();
      if ((now - this.previousUpdateAt) > timeout) {
        this.previousUpdateAt = now;
        this.setState({ cars: [], refreshing: true });
        await wait(fetchInterval);
        continue;
      }

      this.previousUpdateAt = now;

      const cars = [];
      for (const ride of rides) {
        const { car_id, location } = ride;
        const path = JSON.parse(ride.path);
        const [x, y] = location.split(':');
        cars.push({
          id: car_id,
          path: path,
          actual: [parseInt(x), parseInt(y)],
        });
      }

      this.setState({ cars, refreshing: false });
      await wait(fetchInterval);
    }
  }

  async loadCustomers() {
    while (true) {
      const customers = await api.get('/customers');
      this.setState({ customers });
      await wait(fetchInterval);
    }
  }

  componentDidMount() {
    this.loadData();
    this.loadCustomers();
  }

  render() {
    const obstacleElems = [];
    for (let [key, color] of Object.entries(coordsToObstacles)) {
      const [x, y] = key.split(':');
      obstacleElems.push(
        <rect
          key={`${x}:${y}`}
          width={squareSize}
          height={squareSize}
          x={x * squareSize}
          y={y * squareSize}
          fill={color}
          stroke={color}
          onClick={() => console.log(`${x}:${y}`)}
        />
      );
    }

    const cars = this.state.cars.map(({ id, actual, rotation, path }) => {
      return <Car key={id} actual={actual} rotation={rotation || 0} path={path} />;
    });

    const customers = this.state.customers.map(({ id, name, location }) => {
      const [x, y] = location.split(':');
      return (
        <CustomerIcon
          key={`${x}:${y}`}
          x={x * squareSize - (squareSize / 2)}
          y={y * squareSize - (squareSize / 2)}
        />
      );
    });

    return (
      <div className="map">
        <div className="map-inner">
          <div className={`map-refresh ${this.state.refreshing ? 'active' : ''}`} />
          <svg
          width={gridSize}
          height={gridSize}
          className="map"
          >
            {roadRects}
            {obstacleElems}
            {cars}
            {customers}
          </svg>
        </div>
      </div>
    );
  }
}