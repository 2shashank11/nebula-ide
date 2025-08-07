# Nebula IDE ☁️🚀  
A scalable, cloud-based Integrated Development Environment that provides secure code execution and terminal access in isolated Docker containers per user.

## ✨ Features Implemented

- 🔒 **Isolated Workspaces**  
  Each project runs in its own secure Docker container, spun up dynamically per user and per project.

- 🧠 **Microservices-Inspired Architecture**  
  Decoupled services for backend routing, container management, and terminal communication allow scalable session management.

- 📁 **Persistent File Storage**  
  Project files are saved and synced to AWS S3, ensuring data persistence across sessions without using Docker volumes.

- 🖥️ **Interactive Terminal Access**  
  Users can interact with a real terminal in their container via Socket.IO, enabling real-time execution of commands.

- 🔌 **Live Socket Communication**  
  WebSocket integration enables dynamic container control and real-time terminal streaming.

## 📦 Tech Stack

- **Frontend:** React, TailwindCSS, shadcn/ui, Monaco Editor, Redux, Socket.IO Client  
- **Backend:** Node.js, Express.js, Dockerode API, Redis, Socket.IO  
- **Storage & Infra:** AWS S3, Docker, NGINX, PostgreSQL

## 📁 Project Structure (Microservices Overview)

- `main-server`: Auth, routing, and user-project mapping
- `container-runner`: Manages container lifecycle and terminal execution
- `client`: Browser-based IDE interface

## 🛠️ Planned Features

- ⏳ Real-time collaborative editing (multi-user rooms)  
- 🧪 Language-specific sandboxing and debugging support

## 🚀 Setup Instructions

> Make sure Docker and Node.js are installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/2shashank11/nebula-ide.git
   cd nebula-ide
