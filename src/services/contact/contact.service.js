// Initializes the `contact` service on path `/contact`
import { Contact } from './contact.class';

import createModel from '../../models/contact.model';
import hooks from './contact.hooks';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/contact', new Contact(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('contact');

    service.hooks(hooks);
}
