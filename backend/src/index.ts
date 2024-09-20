import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
//import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {Server } from 'socket.io'
import http from 'http'

// routes
import usersRoute from './modules/users/routes'
import authRoute from './modules/auth/routes'
import postsRoute from './modules/posts/routes'
import notificationRoute from './modules/notifications/routes'
import scrapedRoute from './modules/scraped/routes'

//dotenv.config();
import { FRONT_URL,  PORT } from './config/config';
import connectDB from './config/db';
//import Moralis from 'moralis';

// connect mongo
(async () => {
  await connectDB();
})();

// http server
const app = express();
console.log('****** ', FRONT_URL)
app.use(cors({
  origin:[FRONT_URL], 
  //optionsSuccessStatus: 200,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

// error handling middleware
app.use((err:Error, req: Request, res: Response, next:NextFunction) => {
  console.error(err.stack);
  res.status(500).json({msg: 'Internal Server Error!'});
});

// routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postsRoute);
app.use('/api/v1/notifications', notificationRoute);
app.use('/api/v1/scraped', scrapedRoute);

app.get('*', (req: Request, res: Response) => {
  res.json({
    message: 'Catch all!', 
  });
});

// socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [FRONT_URL],
    methods: ["GET", "POST"],
    credentials: true
  }
});

server.listen(PORT, () => {
  console.log(`running on: ${PORT}`);
});

// socket server
io.on('connection', (socket:any) => {
  
  const userId = socket.handshake.query?.userId;
  console.log(`${userId} has joined socket server!`);

  socket.on('joinNotificationRoom', (data:string) => {
    // data is also userId
    console.log(`join notification room: ${data}`);
    if (userId) socket.join(userId);
  })

  // event joinRoom => comes from client
  // room: that client wants to join
  // socket.on('joinRoom', (room:any) => {
  //   // join a room
  //   socket.join(room);
  // })

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  })
})
//===============================

// moralis
// export const initializeMoralis = async () => {
//   if (!Moralis.Core.isStarted) {
//     await Moralis.start({ apiKey: MORALIS_API_KEY });
//     console.log('Moralis initialized');
//   }
// };
// initializeMoralis().catch(console.error)

export {io}