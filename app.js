const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./config/mongoose-connection');
const ownerRouter = require('./routes/ownerRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/owner', ownerRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);


app.listen(3000);