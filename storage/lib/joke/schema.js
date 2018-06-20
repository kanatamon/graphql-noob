import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { getJokes } from './api';

const JokeType = new GraphQLObjectType({
  name: 'JokeType',
  fields: {
    id: {
      type: GraphQLID
    },
    joke: {
      type: GraphQLString,
    }
  },
});

const JokesResolver = {
  type: new GraphQLList(JokeType),
  resolve: _ => getJokes().then(result => {
    if (result.error) {
      throw new Error(result.error);
    }
    return result.data;
  }),
};

export {
  JokeType,
  JokesResolver,
};
