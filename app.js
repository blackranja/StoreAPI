require('dotenv').config();

//async errors__________________________________________________________
require('express-async-errors');

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

//middleware_____________________________________________________________

app.use(express.json());



//routes___________________________________________________________________________

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter);


//Products route______________________________________________________________

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;


const start = async () => {
    try {

        //connectDB__________________________________________

        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening to port ${port} .....`));

    } catch (error) {
        console.log(error);
    }
}
start(); 
