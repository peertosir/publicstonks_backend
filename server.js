const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load env variables
dotenv.config({
  path: './config/config.env',
});

connectDB();

//Routes
const projectRouter = require('./routes/projects');

//Create app
const app = express();

//JSON parser
app.use(express.json());

//Dev logging
if (process.env.NODE_ENV == 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

//Register routes
app.use('/api/v1/projects', projectRouter);


app.use(errorHandler);

//Server startup
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT} in ${process.env.NODE_ENV} mode!`.yellow
    .bold
  );
});

//Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error occured: ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});