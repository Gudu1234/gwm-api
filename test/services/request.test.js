const app = require('../../src/app');

describe("'request' service", () => {
    it('registered the service', () => {
        const service = app.service('request');
        expect(service).toBeTruthy();
    });
});
