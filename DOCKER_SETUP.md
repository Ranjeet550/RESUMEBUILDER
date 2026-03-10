# Docker Setup Guide for Resume Builder

This guide explains how to build and run the Resume Builder application using Docker.

## Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)
- Git

## Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo>
cd resume-builder
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.docker .env.local
```

Edit `.env.local` and update the following values:

```env
MONGO_ROOT_PASSWORD=your_secure_password
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=http://localhost:3000
VITE_API_URL=http://localhost:5000/api
```

### 3. Build and Run with Docker Compose

```bash
# Build all images
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Services

### MongoDB (Port 27017)
- Database service
- Credentials: admin / (your password from .env.local)
- Data persisted in `mongodb_data` volume

### Server (Port 5000)
- Express.js backend
- API endpoints at `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

### Client (Port 3000)
- React frontend with Nginx
- Accessible at `http://localhost:3000`
- Proxies API requests to server

## Common Commands

### View Running Containers
```bash
docker-compose ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongodb
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Reset)
```bash
docker-compose down -v
```

### Rebuild Images
```bash
docker-compose build --no-cache
```

### Execute Commands in Container
```bash
# Access server container
docker-compose exec server sh

# Access client container
docker-compose exec client sh

# Access MongoDB
docker-compose exec mongodb mongosh -u admin -p
```

## Production Deployment

### Build Images for Production

```bash
# Build server image
docker build -t resume-builder-server:latest ./server

# Build client image
docker build -t resume-builder-client:latest ./client
```

### Push to Docker Registry

```bash
# Tag images
docker tag resume-builder-server:latest your-registry/resume-builder-server:latest
docker tag resume-builder-client:latest your-registry/resume-builder-client:latest

# Push to registry
docker push your-registry/resume-builder-server:latest
docker push your-registry/resume-builder-client:latest
```

### Deploy with Docker Compose (Production)

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0-alpine
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - mongodb_data:/data/db

  server:
    image: your-registry/resume-builder-server:latest
    restart: always
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@mongodb:27017/resume-builder?authSource=admin
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mongodb

  client:
    image: your-registry/resume-builder-client:latest
    restart: always
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  mongodb_data:
```

Deploy:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or use different port in docker-compose.yml
```

### MongoDB Connection Failed
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify credentials in .env.local
# Ensure MONGO_ROOT_USER and MONGO_ROOT_PASSWORD are set
```

### Client Can't Connect to Server
```bash
# Check VITE_API_URL in .env.local
# Should be http://localhost:5000/api for local development
# For production, use your server's public URL
```

### Container Won't Start
```bash
# Check logs
docker-compose logs <service-name>

# Rebuild without cache
docker-compose build --no-cache <service-name>
```

## Performance Tips

1. **Use .dockerignore** - Already configured to exclude unnecessary files
2. **Multi-stage builds** - Both Dockerfiles use multi-stage builds to reduce image size
3. **Alpine images** - Using lightweight Alpine Linux images
4. **Volume mounts** - Development mode mounts source code for hot reload

## Security Best Practices

1. **Change default credentials** - Update MONGO_ROOT_PASSWORD and JWT_SECRET
2. **Use secrets management** - For production, use Docker secrets or environment variable management
3. **Non-root user** - Both containers run as non-root users
4. **Health checks** - Configured for all services
5. **Network isolation** - Services communicate through internal Docker network

## File Structure

```
resume-builder/
├── server/
│   ├── Dockerfile          # Server container definition
│   ├── package.json
│   └── index.js
├── client/
│   ├── Dockerfile          # Client container definition
│   ├── nginx.conf          # Nginx configuration
│   ├── package.json
│   └── src/
├── docker-compose.yml      # Orchestration file
├── .dockerignore           # Files to exclude from images
├── .env.docker             # Example environment variables
└── DOCKER_SETUP.md         # This file
```

## Next Steps

1. Configure environment variables in `.env.local`
2. Run `docker-compose up -d`
3. Access the application at `http://localhost:3000`
4. Check logs with `docker-compose logs -f`
5. For production, follow the Production Deployment section

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review Docker logs: `docker-compose logs`
3. Verify environment variables are set correctly
4. Ensure all ports are available
