import user from './user/user.service.js';
import upload from './upload/upload.service';

// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(user);
    app.configure(upload);
}
