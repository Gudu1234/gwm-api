const app = require('../../src/app');

describe("'zone-user' service", () => {
    it('registered the service', () => {
        const service = app.service('zone-user');
        expect(service).toBeTruthy();
    });
});
