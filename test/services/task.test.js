const app = require('../../src/app');

describe('\'task\' service', () => {
  it('registered the service', () => {
    const service = app.service('task');
    expect(service).toBeTruthy();
  });
});
