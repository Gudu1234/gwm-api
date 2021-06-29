const app = require('../../src/app');

describe("'custom' service", () => {
    it('registered the service', () => {
        const service = app.service('custom');
        expect(service).toBeTruthy();
    });
});
