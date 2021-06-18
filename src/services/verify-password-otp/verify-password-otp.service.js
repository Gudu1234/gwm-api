// Initializes the `verify-password-otp` service on path `/verify-password-otp`
import { VerifyPasswordOtp } from './verify-password-otp.class';

import hooks from './verify-password-otp.hooks';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/verify-password-otp', new VerifyPasswordOtp(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('verify-password-otp');

    service.hooks(hooks);
}
