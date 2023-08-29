const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json());

// Connect to database via mongoose
const uri = process.env.DATABASE_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);

mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established successfully.");
});

// Get routes
const indexRouter = require('./routes/index');
const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

app.use('/', indexRouter);
app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.listen(port, (err, res) => {
	if (err) {
		console.log(err)
		return res.status(500).send(err.message)
	} else {
		console.log('[INFO] Server Running on port:', port)
	}
})