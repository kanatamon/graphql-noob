import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
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

export default JokeType;
