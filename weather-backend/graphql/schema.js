const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Weather {
    id: ID!
    location: String!
    temperature: Float!
    description: String!
    icon: String!
    date: String!
  }

  input WeatherInput {
    location: String!
    fromDate: String!
    toDate: String!
  }

  type Query {
    getWeather(location: String!): Weather
    getHistory(location: String!, fromDate: String!, toDate: String!): [Weather]
  }

  type Mutation {
    fetchWeather(input: WeatherInput!): [Weather]
  }
`);
