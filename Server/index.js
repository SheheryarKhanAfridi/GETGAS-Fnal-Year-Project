const dotenv= require('dotenv');
const express = require('express')
const app = express()
dotenv.config({path:'./config.env'});
require('./Database/connection.js')
require('./Schemas/user.js')
const cookieParser = require('cookie-parser');
const port=process.env.PORT
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(require('./Routes/route.js'))
const jwt=require('jsonwebtoken');
// const http = require('http');
// const { Server } = require('socket.io');
// const server = http.createServer(app);
// const io = new Server(server);


app.get('/', function (req, res) {
  res.send('Hello World from the home page')
})

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Handle disconnect
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

app.listen(port,()=>{
  console.log(`server is runing on ${port}`)
})
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });