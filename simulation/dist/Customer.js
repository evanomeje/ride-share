import g from './global.js';
import { wait, getRandomInt, decide } from '../../shared/utils.js';
import { getRoadNodes } from './methods.js';
import config from '../../shared/config.js';
const { maxActiveCustomers, refreshInterval } = config;
const roadNodes = getRoadNodes();
export default class Customer {
    constructor({ customerId, name }) {
        this.active = false;
        this.location = null;
        this.destination = null;
        this.driverRequested = false;
        this.driverId = null;
        this.customerId = customerId;
        this.name = name;
        this.handleDestinationResult = this.handleDestinationResult.bind(this);
        this.simulate();
    }
    isNotMatched() {
        return (this.active && this.destination && !this.driverId && !this.driverRequested);
    }
    async updateDB() {
        return g.db.query(`
      INSERT INTO customers (customer_id, name, active, location, destination)
      VALUES (
        '${this.customerId}',
        '${this.name}',
        ${this.active},
        '${this.location && `${this.location[0]}:${this.location[1]}`}',
        '${this.destination && `${this.destination[0]}:${this.destination[1]}`}'
      )
      ON CONFLICT (name)
      DO UPDATE SET 
      name = EXCLUDED.name,
      active = EXCLUDED.active,
      location = EXCLUDED.location,
      destination = EXCLUDED.destination
      `);
    }
    async simulate() {
        while (true) {
            // Active and waiting for the destination
            if (this.active && !this.destination) {
                await wait(refreshInterval);
                continue;
            }
            // Decide on the new active status
            let newActive = this.active;
            // If inactive, decide if to become active
            if (!this.active && g.activeCustomers.size < maxActiveCustomers) {
                newActive = decide(5);
            }
            // Change of active status
            if (this.active !== newActive) {
                this.active = newActive;
                if (newActive) {
                    // Became active -> decide on the destination
                    const location = roadNodes[getRandomInt(0, roadNodes.length - 1)];
                    this.location = location;
                    g.activeCustomers.set(this.customerId, location);
                    g.getDestination.send({
                        customerId: this.customerId,
                        location,
                    });
                }
                else {
                    // Just became inactive -> clear state
                    g.activeCustomers.delete(this.customerId);
                    this.active = false;
                    this.location = null;
                    this.destination = null;
                    this.driverRequested = false;
                    this.updateDB();
                }
            }
            // Match with a driver
            if (this.isNotMatched()) {
                this.driverRequested = true;
                g.dispatcher.send({
                    from: 'customer',
                    data: {
                        customerId: this.customerId,
                        name: this.name,
                        location: this.location,
                    },
                });
            }
            await wait(refreshInterval);
        }
    }
    handleDestinationResult(destination) {
        this.destination = destination;
        this.updateDB();
    }
    handleDispatcherResult(driverId) {
        this.driverId = driverId;
        this.updateDB();
    }
}
//# sourceMappingURL=Customer.js.map