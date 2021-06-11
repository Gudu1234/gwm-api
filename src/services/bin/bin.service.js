// Initializes the `bin` service on path `/bin`
import { Bin } from './bin.class';

import createModel from '../../models/bin.model';
import hooks from './bin.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/bin', new Bin(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('bin');

    service.hooks(hooks);
}
