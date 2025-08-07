require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server: SocketServer } = require('socket.io');
const cors = require('cors')
const chokidar = require('chokidar');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const fs = require('fs/promises')
const path = require('path');

const terminalService = require('./services/terminal');
const authenticate = require('./middleware/auth')

const projectRoute = require('./routes/project');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}));

const server = http.createServer(app);

// SOCKET
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  },
  path: '/terminal/socket.io',
});

const socketNamespace = io.of('/terminal');
terminalService(socketNamespace);

// MIDDLEWARES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


// ROUTES
app.use('/project', authenticate, projectRoute);


app.get('/', async (req, res) => {
    res.send({message: 'Container-Server'})
})

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});


server.listen(9001, () => {
  console.log('Container Runner server is running on port 9001');
});










// app.get('/files', async (req, res) => {
//   const fileTree = await generateFileTree('./services/user-files')
//   return res.json({tree: fileTree});
// })

// async function generateFileTree(directory) {
//   async function buildTree(currentDir) {
//     const items = await fs.readdir(currentDir)
//     const result = []

//     for (const item of items) {
//       const itemPath = path.join(currentDir, item)
//       const stat = await fs.stat(itemPath)

//       if (stat.isDirectory()) {
//         const children = await buildTree(itemPath)
//         result.push([item, children])
//       } else {
//         result.push(item)
//       }
//     }

//     return result
//   }

//   return await buildTree(directory)
// }