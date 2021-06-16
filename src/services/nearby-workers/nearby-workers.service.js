// Initializes the `nearby-workers` service on path `/nearby-workers`
import { NearbyWorkers } from './nearby-workers.class';

import hooks from './nearby-workers.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/nearby-workers', new NearbyWorkers(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('nearby-workers');

    service.hooks(hooks);
}
