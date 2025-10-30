const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Todo Backend Running...');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
