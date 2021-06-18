// Initializes the `reset-password` service on path `/reset-password`
import { ResetPassword } from './reset-password.class';

import hooks from './reset-password.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/reset-password', new ResetPassword(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('reset-password');

    service.hooks(hooks);
}
