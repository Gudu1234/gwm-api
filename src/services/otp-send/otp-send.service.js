// Initializes the `otp-send` service on path `/otp-send`
import { OtpSend } from './otp-send.class';

import createModel from '../../models/otp-send.model';
import hooks from './otp-send.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/otp-send', new OtpSend(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('otp-send');

    service.hooks(hooks);
}
