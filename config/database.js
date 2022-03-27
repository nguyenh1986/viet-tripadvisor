const mongoose = require('mongoose');

// shortcut to mongoose.connection object
const db = mongoose.connection;
	
mongoose.connect(process.env.DATABASE_URL);