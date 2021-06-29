const app = require('../../src/app');

describe("'reset-password' service", () => {
    it('registered the service', () => {
        const service = app.service('reset-password');
        expect(service).toBeTruthy();
    });
});
