// Initializes the `zone-user` service on path `/zone-user`
import { ZoneUser } from './zone-user.class';

import hooks from './zone-user.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/zone-user', new ZoneUser(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('zone-user');

    service.hooks(hooks);
}
