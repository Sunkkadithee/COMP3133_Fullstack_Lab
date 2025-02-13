const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const dotenv = require('dotenv');

// Store sensitive information in env variables
dotenv.config();

// MongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

// Test MongoDB connection
const testDatabaseConnection = async () => {
  try {
    const result = await mongoose.connection.db.collection('movies').find({}).toArray();
    console.log('Test Query Result:', result);
  } catch (err) {
    console.error('Error during test query:', err.message);
  }
};

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 45000, // 45 seconds
      serverSelectionTimeoutMS: 45000, // 45 seconds
    });
    console.log('MongoDB connection successful');
    testDatabaseConnection();  // Test the database connection
  } catch (err) {
    console.log('Error MongoDB connection', err.message);
  }
};

// Define GraphQL Schema
const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
  }

  type Mutation {
    addMovie(
      name: String!
      director_name: String!
      production_house: String!
      release_date: String!
      rating: Float!
    ): Movie
    updateMovie(
      id: ID!
      name: String
      director_name: String
      production_house: String
      release_date: String
      rating: Float
    ): Movie
    deleteMovie(id: ID!): Movie
  }
`;

// Define GraphQL Resolvers
const resolvers = {
  Query: {
    getMovies: async () => {
      try {
        const movies = await mongoose.connection.db.collection('movies').find({}).toArray();
        return movies;
      } catch (err) {
        console.log('Error fetching movies:', err.message);
        return [];
      }
    },
    getMovie: async (_, { id }) => {
      try {
        const movie = await mongoose.connection.db.collection('movies').findOne({ _id: mongoose.Types.ObjectId(id) });
        return movie;
      } catch (err) {
        console.log('Error fetching movie by ID:', err.message);
        return null;
      }
    },
  },
  Mutation: {
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
      try {
        const newMovie = {
          name,
          director_name,
          production_house,
          release_date,
          rating,
        };
        const result = await mongoose.connection.db.collection('movies').insertOne(newMovie);
        return { id: result.insertedId, ...newMovie };
      } catch (err) {
        console.log('Error adding movie:', err.message);
        return null;
      }
    },
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      try {
        const updatedMovie = {
          name: name || 'Updated Movie Name',
          director_name: director_name || 'Updated Director',
          production_house: production_house || 'Updated Production House',
          release_date: release_date || 'Updated Release Date',
          rating: rating || 8.5,
        };
        const result = await mongoose.connection.db.collection('movies').updateOne(
          { _id: mongoose.Types.ObjectId(id) },
          { $set: updatedMovie }
        );
        return { id, ...updatedMovie };
      } catch (err) {
        console.log('Error updating movie:', err.message);
        return null;
      }
    },
    deleteMovie: async (_, { id }) => {
      try {
        const result = await mongoose.connection.db.collection('movies').deleteOne({ _id: mongoose.Types.ObjectId(id) });
        return { id, name: 'Deleted Movie' };
      } catch (err) {
        console.log('Error deleting movie:', err.message);
        return null;
      }
    },
  },
};

// Define Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors());

// Add Express app as middleware to Apollo Server
server.applyMiddleware({ app });

// Start the server
app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
  connectDB(); // Start the connection
});
