const app = require('../../src/app');

describe("'verify-password-otp' service", () => {
    it('registered the service', () => {
        const service = app.service('verify-password-otp');
        expect(service).toBeTruthy();
    });
});
