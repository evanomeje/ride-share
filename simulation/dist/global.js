import { fork } from 'child_process';
import dbInit from './dbInit.js';
const g = {
    db: null,
    getDestination: null,
    dispatcher: null,
    activeCustomers: null,
    init: null,
};
const init = async () => {
    g.db = await dbInit();
    g.getDestination = fork('getDestination.js');
    g.dispatcher = fork('dispatcher.js');
    g.activeCustomers = new Map();
};
g.init = init;
export default g;
//# sourceMappingURL=global.js.map