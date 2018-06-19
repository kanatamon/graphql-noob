import { JokeType, JokesResolver } from './type';
import { GraphQLID, GraphQLString } from 'graphql';
import * as jokeApi from './api';

describe('JokeType', () => {
  test('should have `id` field of type ID', () => {
    expect(JokeType.getFields()).toHaveProperty('id');
    expect(JokeType.getFields().id.type).toEqual(GraphQLID);
  });

  test('should have `joke` field of type String', () => {
    expect(JokeType.getFields()).toHaveProperty('joke');
    expect(JokeType.getFields().joke.type).toEqual(GraphQLString);
  });
});

describe('JokesResolver.resolve', () => {
  const spy = jest.spyOn(jokeApi, 'getJokes');
  
  afterEach(() => {
    // Reset all mocked during a test
    spy.mockReset();
  });
  
  afterAll(() => {
    // Restore to the original implementation
    spy.mockRestore();
  });

  test('should call `getJokes`', async () => {
    jokeApi.getJokes.mockResolvedValue({ data: [], error: null });
    await JokesResolver.resolve();
    expect(jokeApi.getJokes).toHaveBeenCalled();
  });

  test('should resovle a list of data when `getJokes` resovled `{ ..., error: null }`', async () => {
    jokeApi.getJokes.mockResolvedValue({ data: [], error: null });
    await expect(JokesResolver.resolve()).resolves.toEqual([]);
  });

  test('should throw an error when `getJokes` resolved `{ ..., error: any }`', async () => {
    const error = 'An error occured';
    jokeApi.getJokes.mockResolvedValue({ error });
    await expect(JokesResolver.resolve()).rejects.toThrow(error);
  });
});
