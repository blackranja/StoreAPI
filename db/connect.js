const mongoose = require('mongoose');
mongoose.set('stricQuery', true);

const connectDB = (url) => {
    return mongoose.connect(url);
}
module.exports = connectDB;
