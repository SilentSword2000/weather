// server/graphql/typeDefs.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Weather {
    id: ID!
    location: String!
    temperature: Float!
    description: String!
    icon: String!
    date: String!
    humidity: Float
    windSpeed: Float
    pressure: Float
    createdAt: String!
  }

  type Query {
    getWeather(location: String!): Weather
    getHistoricalWeather(location: String!, fromDate: String!, toDate: String!): [Weather]
    getLocations: [String]
  }

  type Mutation {
    fetchAndStoreWeather(location: String!): Weather
  }
`;