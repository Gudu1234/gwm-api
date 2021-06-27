// Initializes the `task` service on path `/task`
import { Task } from './task.class';

import createModel from '../../models/task.model';
import hooks from './task.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/task', new Task(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('task');

    service.hooks(hooks);
}
