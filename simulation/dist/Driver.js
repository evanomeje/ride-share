import g from './global.js';
import { wait, getRandomInt } from '../../shared/utils.js';
import { getRoadNodes } from './methods.js';
import config from '../../shared/config.js';
const { refreshInterval } = config;
const roadNodes = getRoadNodes();
export default class Driver {
    constructor({ driverId, name }) {
        this.location = null;
        this.customerId = null;
        this.driverId = driverId;
        this.name = name;
        this.location = roadNodes[getRandomInt(0, roadNodes.length - 1)];
        this.simulate();
    }
    async updateDB() {
        const dummyPath = this.location &&
            `[[${this.location[0]}, ${this.location[1]}], [${this.location[0] + 1}, ${this.location[1]}]]`;
        return g.db.query(`
      INSERT INTO drivers (driver_id, location, path)
      VALUES (
        '${this.driverId}',
        '${this.location[0]}:${this.location[1]}',
        '${dummyPath}'
      )
      ON CONFLICT (driver_id)
      DO UPDATE SET location = EXCLUDED.location, path = EXCLUDED.path;
      `);
    }
    async simulate() {
        g.dispatcher.send({
            from: 'driver',
            data: {
                driverId: this.driverId,
                name: this.name,
                location: this.location,
            },
        });
        this.updateDB();
        while (true) {
            await wait(refreshInterval);
        }
    }
    handleDispatcherResult(customerId) {
        this.customerId = customerId;
        this.updateDB();
    }
}
//# sourceMappingURL=Driver.js.map