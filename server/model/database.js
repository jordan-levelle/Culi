const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect err'));
db.once('open', function(){
    console.log('connection established')
});

require('./categories');
require('./Recipe');