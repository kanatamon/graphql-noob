import { JokeType, JokesResolver } from './type';
import { GraphQLID, GraphQLString } from 'graphql';
import { getJokes } from './api';

jest.mock('./api');

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
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call `getJokes`', async () => {
    getJokes.mockResolvedValue({ data: [], error: null });
    await JokesResolver.resolve();
    expect(getJokes).toHaveBeenCalled();
  });

  test('should resovle a list of data when `getJokes` resovled `{ ..., error: null }`', async () => {
    getJokes.mockResolvedValue({ data: [], error: null });
    await expect(JokesResolver.resolve()).resolves.toEqual([]);
  });

  test('should throw an error when `getJokes` resolved `{ ..., error: any }`', async () => {
    const error = 'An error occured';
    getJokes.mockResolvedValue({ error });
    await expect(JokesResolver.resolve()).rejects.toThrow(error);
  });
});
