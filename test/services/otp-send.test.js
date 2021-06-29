const app = require('../../src/app');

describe("'otp-send' service", () => {
    it('registered the service', () => {
        const service = app.service('otp-send');
        expect(service).toBeTruthy();
    });
});
