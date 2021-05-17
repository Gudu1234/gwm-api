// Initializes the `zone` service on path `/zone`
import { Zone } from './zone.class';

import createModel from '../../models/zone.model';
import hooks from './zone.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/zone', new Zone(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('zone');

    service.hooks(hooks);
}
