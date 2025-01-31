const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('../lab3_restaurant_database/routes/Restaurant'); // Make sure the name matches
const app = express();

app.use(express.json()); // Make sure it comes back as json

// MongoDB connection string
const DB_NAME = "db_comp3133_emplyess";
const DB_USER_NAME = "ppjpang";
const DB_PASSWORD = 'dIZRbXK4U4abrqP9';
const CLUSTER_ID = 'wnnef';

const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success MongoDB connection');
}).catch(err => {
  console.log('Error MongoDB connection');
});

// Use the correct router here
app.use(restaurantRouter);

app.listen(3000, () => { console.log('Server is running...') });
