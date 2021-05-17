// Initializes the `request` service on path `/request`
import { Request } from './request.class';

import createModel from '../../models/request.model';
import hooks from './request.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate'],
    };

    // Initialize our service with any options it requires
    app.use('/request', new Request(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('request');

    service.hooks(hooks);
}
