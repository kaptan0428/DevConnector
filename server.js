const express = require('express'); 
const connectDB = require('./config/db'); 

const app = express(); // Intialise Express

// Connect database
connectDB(); 

// Init Middleware
app.use(express.json({ extended: false })); 

app.get('/', (rew, res) => res.send('API running'));


// The app.use() method mounts or puts the specified middleware functions at the specified path.

// Define routes
app.use('/api/users', require('./routes/api/users')); 
app.use('/api/auth', require('./routes/api/auth')); 
app.use('/api/profile', require('./routes/api/profile')); 
app.use('/api/posts', require('./routes/api/posts')); 


const PORT = process.env.PORT || 5000; 

// The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));  