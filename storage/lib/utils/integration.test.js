import * as integrationServer from './integrationServer';
import * as jokeApiMock from '../joke/api';

describe('intregation', () => {
  let app;
  const spy = jest.spyOn(jokeApiMock, 'getJokes');

  beforeEach(done => {
    app = integrationServer.start(9000, done);
  });

  afterEach(done => {
    integrationServer.stop(app, done);
    spy.mockReset();
  });

  afterAll(() => {
    spy.mockRestore();
  });

  test('should resolve a list of jokes', async () => {
    const query = `{
      jokes {
        id,
        joke
      }
    }`;
    const expected = {
      data: {
        jokes: [
          {
            id: "1",
            joke: 'Chuck Norris uses ribbed condoms inside out, so he gets the pleasure.'
          },
          {
            id: "2",
            joke: 'MacGyver can build an airplane out of gum and paper clips. Chuck Norris can kill him and take it.'
          },
        ]
      },
    };
    jokeApiMock.getJokes.mockResolvedValue({
      data: expected.data.jokes,
      error: null,
    });
    await expect(integrationServer.graphqlQuery(app, query))
      .resolves
      .toEqual(expected);
  });
});
