import user from './user/user.service.js';
import upload from './upload/upload.service';
import zone from './zone/zone.service';
import contact from './contact/contact.service';
import request from './request/request.service';
import bin from './bin/bin.service';
import nearbyWorkers from './nearby-workers/nearby-workers.service';

import forgetPassword from './forget-password/forget-password.service';
import verifyPasswordOtp from './verify-password-otp/verify-password-otp.service';
import resetPassword from './reset-password/reset-password.service';
import otpSend from './otp-send/otp-send.service';

// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(user);
    app.configure(upload);
    app.configure(zone);
    app.configure(contact);
    app.configure(request);
    app.configure(bin);
    app.configure(nearbyWorkers);

    app.configure(forgetPassword);
    app.configure(verifyPasswordOtp);
    app.configure(resetPassword);
    app.configure(otpSend);
}
