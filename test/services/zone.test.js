const app = require('../../src/app');

describe("'zone' service", () => {
    it('registered the service', () => {
        const service = app.service('zone');
        expect(service).toBeTruthy();
    });
});
