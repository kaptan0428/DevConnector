const express = require('express'); 
const connectDB = require('./config/db'); 

const app = express(); // Intialise Express

// Connect database
connectDB(); 

app.get('/', (rew, res) => res.send('API running'));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));  