const app = require('../../src/app');

describe("'bin' service", () => {
    it('registered the service', () => {
        const service = app.service('bin');
        expect(service).toBeTruthy();
    });
});
