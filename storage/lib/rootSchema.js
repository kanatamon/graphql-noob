import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { JokesResolver } from './joke/type';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      jokes: JokesResolver,
    },
  })
});
