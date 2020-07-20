const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });

//Connect to Dtabase
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}`
  )
);

process.on('unhndledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
