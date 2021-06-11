// Initializes the `users` service on path `/users`
import { User } from './user.class';

import createModel from '../../models/user.model';
import hooks from './user.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/user', new User(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('user');

    service.hooks(hooks);
}
