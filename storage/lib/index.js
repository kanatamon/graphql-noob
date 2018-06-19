import express from 'express';
import graphqlHTTP from 'express-graphql';
import rootSchema from './rootSchema';

const PORT = 3000;

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: rootSchema,
  pretty: true,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
});
