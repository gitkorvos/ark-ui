const express = require("express");
const cors = require("cors");
const helmet = require('helmet')
const morgan = require("morgan");
const routes = require("./routes/routes");
const path = require("path");

const sequelize = require('./config/database');
const Server = require("./models/Server");
//require("dotenv").config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) });

const app = express();

// Enable CORS and security headers
app.use(cors());
app.use(helmet());

// Logging
app.use(morgan("combined"));

// JSON body parsing
app.use(express.json());

// Routes
app.use(routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});


(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
