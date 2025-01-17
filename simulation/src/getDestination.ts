import { wait } from '../../shared/utils.js';
import {
  generateDestination,
  getClosestRoadNode,
  getGraph,
} from './methods.js';

const graph = getGraph();

interface Message {
  name: string;
  location: [number, number];
}

const queue: Message[] = [];

process.on('message', ({ name, location }: Message) => {
  queue.push({ name, location });
});

const main = async () => {
  while (true) {
    if (queue.length) {
      const message = queue.shift();
      if (message) {
        const { name, location } = message;
        const [x, y] = location;

        let [destX, destY] = generateDestination([x, y]);
        process.send?.({ name, destination: [destX, destY] });
      }
    }

    if (queue.length) continue;
    else await wait(200);
  }
};

main();