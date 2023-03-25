import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Create Server
const app = express();
app.listen(3000,()=>{
  console.log('Server is Running');
});
app.get('/',(req,res)=>{
  res.send('Hello World');
});

app.use(express.json());
app.use(cors());

// Database Connection
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/products').then(()=>{
  console.log('database connected');
}).catch((err)=>{
  console.log('error',err);
});

// Create Database
const schema = mongoose.Schema({
  name: String,
  price: Number,
  desc: String
});
const db = mongoose.model('product',schema);

// CRUD operations
app.post('/products', async(req, res) => {
  const {name,price,desc} = req.body;
  await db.insertMany({name,price,desc});
  res.json({message:'success'});
});

app.put('/products', async (req, res) => {
  const {name,price,desc} = req.body;
  await db.updateMany({name,price,desc});
  res.json({message:'success'});
});

app.delete('/products', async (req, res) => {
  const {name} = req.body;
  await db.deleteMany({name});
  res.json({message:'success'});
});

app.get('/products', async (req, res) => {
  let api = await db.find();
  res.json({message: 'success',api});
});