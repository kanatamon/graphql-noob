import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphql } from 'graphql';
import rootSchema from './rootSchema';

const PORT = 3000;

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
