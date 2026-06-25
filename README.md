# Ecommerce App

A full-stack ecommerce web application built with React, Node.js, Express, and MongoDB.

## Tech Stack

**Frontend**
- React.js
- Redux Toolkit
- Ant Design
- React Query

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

## Project Structure

```
myproject/
├── ecommerce-project/   # React frontend
├── ecommerce-backend/   # Node.js backend
├── docker-compose.yml
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) & Docker Compose
- [MongoDB Atlas](https://www.mongodb.com/atlas) account

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Setup environment variables

**Backend** — create `ecommerce-backend/src/.env`:
```env
PORT=3001
MONGO_DB=your_mongodb_atlas_connection_string
ACCESS_TOKEN=your_jwt_access_token_secret
REFRESH_TOKEN=your_jwt_refresh_token_secret
```

**Frontend** — create `ecommerce-project/.env`:
```env
REACT_APP_URL_BACKEND=http://localhost:3001/api
```

### 3. Run without Docker

**Backend:**
```bash
cd ecommerce-backend
npm install
npm start
```

**Frontend:**
```bash
cd ecommerce-project
npm install
npm start
```

App runs at `http://localhost:3000`

### 4. Run with Docker

```bash
docker-compose up --build
```

App runs at `http://localhost`

To stop:
```bash
docker-compose down
```

## Deployment (AWS EC2)

1. Launch an EC2 instance (Ubuntu 22.04)
2. Open ports 22, 80, 443 in Security Group
3. Assign an Elastic IP
4. SSH into the server:
```bash
ssh -i "your-key.pem" ubuntu@YOUR_ELASTIC_IP
```
5. Install Docker:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
sudo apt install docker-compose -y
newgrp docker
```
6. Upload the project and run:
```bash
docker-compose up --build -d
```
7. Point your domain's **A record** to the Elastic IP in your DNS provider.

## Features

- User authentication (login / register)
- Product management (admin)
- User management (admin)
- Product search and filtering
- Shopping cart
- Order management

## License

MIT
