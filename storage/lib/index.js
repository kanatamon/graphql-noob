import express from 'express';
import jwt from 'express-jwt';
import jwtWebToken from 'jsonwebtoken';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

var fakeDatabase = {};

var JWT_SECRET = 'LISTEN! the password is ...'; 
var jwtMiddleware = jwt({ secret: JWT_SECRET }).unless({ path: ['/auth'] });
var bodyParserMiddleware = bodyParser.json();

var logginMiddleware = (request, resolver, next) => {
  console.log('ip:', request.ip);
  next();
};

var handlingErrorMiddleware = (error, request, resolver, next) => {
  if (error.name === 'UnauthorizedError') {
    resolver.status(401).send('invalid token...');
  }
  next();
};

var app = express();
app.use([
  bodyParserMiddleware,
  logginMiddleware,
  jwtMiddleware,
  handlingErrorMiddleware,
]);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  input MessageInput {
    content: String
    author: String
  }
  
  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getDie(numSides: Int): RandomDie
    getMessage(id: ID!): Message
    ip: String
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    return Array.from(Array(numRolls).keys())
      .map(_ => this.rollOnce());
  }
}

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// The root provides a resolver function for each API endpoint
var root = {
  ip: (args, request) => request.ip,
  getDie: ({ numSides }) => new RandomDie(numSides || 6),
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  updateMessage: ({ id, input }) => {
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  createMessage: ({ input }) => {
    const id = Date.now();
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false,
}));

app.post('/auth', (request, response) => {
  const { username, password } = request.body;
  if (username === 'kantapon' && password === '1234') {
    const token = jwtWebToken.sign({ username }, JWT_SECRET);
    response.json({ token });
  }
  response.status(401).json({ error: 'Invalid username or password' });
});

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));
