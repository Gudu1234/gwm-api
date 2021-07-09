// Initializes the `dashboard` service on path `/dashboard`
import { Dashboard } from './dashboard.class';

import createModel from '../../models/dashboard.model';
import hooks from './dashboard.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/dashboard', new Dashboard(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('dashboard');

    service.hooks(hooks);
}
