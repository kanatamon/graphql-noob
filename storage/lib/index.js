import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  graphql,
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';
import { JokesSchema } from './joke/type';

const PORT = 3000;

const rootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      jokes: JokesSchema,
    },
  })
});

const app = express();

app.use('/graphiql', graphqlHTTP({
  schema: rootSchema,
  pretty: true,
  graphiql: true,
}));

app.get('/graphql', (req, res) => {
  const graphqlQuery = req.query.graphqlQuery;
  if (!graphqlQuery) {
    return res.status(500).send('You must provide a query');
  }
  return graphql(rootSchema, graphqlQuery)
    .then(response => response.data)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
});
