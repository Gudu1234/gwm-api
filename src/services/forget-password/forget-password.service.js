// Initializes the `forget-password` service on path `/forget-password`
import { ForgetPassword } from './forget-password.class';

import hooks from './forget-password.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/forget-password', new ForgetPassword(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('forget-password');

    service.hooks(hooks);
}
