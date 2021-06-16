import user from './user/user.service.js';
import upload from './upload/upload.service';
import zone from './zone/zone.service';
import contact from './contact/contact.service';
import request from './request/request.service';
import bin from './bin/bin.service';
import nearbyWorkers from './nearby-workers/nearby-workers.service';

// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(user);
    app.configure(upload);
    app.configure(zone);
    app.configure(contact);
    app.configure(request);
    app.configure(bin);
    app.configure(nearbyWorkers);
}
