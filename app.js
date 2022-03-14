// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


const { isAuthenticated } = require('./middleware/jwt.middleware');

// --- Routes --- //

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", isAuthenticated, userRoutes);

const clientRoutes = require("./routes/client.routes");
app.use("/client", isAuthenticated, clientRoutes);

const projectRoutes = require("./routes/project.routes");
app.use("/project", isAuthenticated, projectRoutes);

const cardRoutes = require("./routes/card.routes");
app.use("/card", isAuthenticated, cardRoutes)

// ❗ Error Route

require("./error-handling")(app);

module.exports = app;
