import express from 'express';
import graphqlHTTP from 'express-graphql';
import rootSchema from '../rootSchema';
import axios from 'axios';

function start(appPort, done) {
  const app = express();
  const PORT = appPort || 3000;

  app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    pretty: true,
    graphiql: true,
  }));

  return app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
    done();
  });
}

function stop(app, done) {
  app.close();
  done();
}

function graphqlQuery(app, query) {
  return axios({
      method: 'post',
      baseURL: `http://localhost:${app.address().port}`,
      url: '/graphql',
      data: { query },
    })
    .then(response => response.data);
}

export {
  start,
  stop,
  graphqlQuery,
};
