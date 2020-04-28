const express = require('express');
const dotenv = require('dotenv');

//Load env variables
dotenv.config({
  path: './config/config.env',
});

const app = express();

const PORT = process.env.PORT || 3400;

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT} in ${process.env.NODE_ENV} mode!`
  );
});
