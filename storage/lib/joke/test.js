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
  let originalGetJokes;
  beforeEach(() => {
    // Save the original implementation
    originalGetJokes = jokeApi.getJokes;
  });

  afterEach(() => {
    // Restore to the original
    jokeApi.getJokes = originalGetJokes;
  });

  test('should call `getJokes`', async () => {
    const metadata = { calls: [] };
    jokeApi.getJokes = (...args) => {
      metadata.calls.push(args);
      return Promise.resolve({ data: [], error: null });
    };
    await JokesResolver.resolve();
    expect(metadata.calls).toHaveLength(1);
  });

  test('should resovle a list of data when `getJokes` resovled `{ ..., error: null }`', async () => {
    jokeApi.getJokes = () => Promise.resolve({ data: [], error: null });
    const result = await JokesResolver.resolve();
    expect(result).toEqual([]);
  });

  test('should throw an error when `getJokes` resolved `{ ..., error: any }`', async () => {
    const error = 'An error occured';
    jokeApi.getJokes = () => Promise.resolve({ error });
    await expect(JokesResolver.resolve()).rejects.toThrow(error);
  });
});
