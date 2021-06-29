const app = require('../../src/app');

describe("'nearby-workers' service", () => {
    it('registered the service', () => {
        const service = app.service('nearby-workers');
        expect(service).toBeTruthy();
    });
});
