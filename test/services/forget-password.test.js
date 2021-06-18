const app = require('../../src/app');

describe('\'forget-password\' service', () => {
  it('registered the service', () => {
    const service = app.service('forget-password');
    expect(service).toBeTruthy();
  });
});
