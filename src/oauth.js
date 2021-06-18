/**
 * Created by Soumya (soumya@smarttersstudio.com) on 19/06/21 at 2:01 AM.
 */

import { google } from 'googleapis';

export default function (app) {
    const OAuth2 = google.auth.OAuth2;

    const { appId, appSecret, refreshToken } = app.get('google');

    const oauth2Client = new OAuth2(appId, appSecret, 'https://developers.google.com/oauthplayground');

    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

    // console.log(oauth2Client);
    app.set('OAuth2Client', oauth2Client);
}
