const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/weatherSchema');
const rootValue = require('./resolvers/weatherResolver');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error', err));

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});
