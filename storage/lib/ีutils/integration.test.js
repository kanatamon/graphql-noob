import * as integrationServer from './integrationServer';

describe('intregation', () => {
  let app;
  beforeEach(done => {
    app = integrationServer.start(9000, done);
  });

  afterEach(done => {
    integrationServer.stop(app, done);
  });

  test('should resolve a list of jokes', async () => {
    const query = `{
      jokes {
        id,
        joke
      }
    }`;
    const result = await integrationServer.graphqlQuery(app, query);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('jokes');
    expect(result.data.jokes).toEqual(expect.any(Array));
  });
});
