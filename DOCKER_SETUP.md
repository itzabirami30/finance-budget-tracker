# Finance Budget Tracker - Docker Setup Guide

## Quick Start with Docker

### Prerequisites

- Docker ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)
- Git

### Option 1: Quick Start (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/itzabirami30/finance-budget-tracker.git
   cd finance-budget-tracker
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)
   - MongoDB: `mongodb://root:password@localhost:27017`

4. **View logs**
   ```bash
   docker-compose logs -f
   ```

5. **Stop services**
   ```bash
   docker-compose down
   ```

### Option 2: Production Build

1. **Build images**
   ```bash
   docker-compose -f docker-compose.yml build
   ```

2. **Start with production settings**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

## Configuration

### Environment Variables

#### Backend (.env file)
```
PORT=5000
MONGODB_URI=mongodb://root:password@mongodb:27017/finance-tracker?authSource=admin
JWT_SECRET=your_very_secret_key
NODE_ENV=development
```

#### Frontend (.env file)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### MongoDB Credentials (docker-compose.yml)
- Username: `root`
- Password: `password`
- Database: `finance-tracker`

**Change these in production!**

## Common Docker Commands

### View running containers
```bash
docker-compose ps
```

### View container logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs
docker-compose logs -f backend
```

### Execute command in container
```bash
# Backend
docker-compose exec backend npm test

# MongoDB
docker-compose exec mongodb mongosh
```

### Rebuild containers
```bash
docker-compose build --no-cache
```

### Remove all containers and volumes
```bash
docker-compose down -v
```

## Troubleshooting

### Port already in use

```bash
# Change ports in docker-compose.yml
# Or kill existing process
lsof -i :3000  # Find process on port 3000
kill -9 <PID>  # Kill process
```

### MongoDB connection error

```bash
# Check if MongoDB container is running
docker-compose ps

# View MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Frontend not connecting to backend

1. Verify `REACT_APP_API_URL` in `client/.env`
2. Ensure backend is running: `docker-compose logs backend`
3. Check network: `docker network ls`
4. Rebuild frontend: `docker-compose build frontend`

### Clear Docker cache

```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything
docker system prune -a
```

## Development with Docker

### Live code updates

Volumes in `docker-compose.yml` enable live reloading:

```yaml
volumes:
  - ./server:/app      # Backend code
  - ./client:/app      # Frontend code
  - /app/node_modules  # Preserve node_modules
```

Changes to source files automatically reflect in running containers.

### Debug Mode

Add to `docker-compose.yml` for backend debugging:

```yaml
environment:
  DEBUG: '*'
```

## Production Deployment

### Before deploying:

1. Change all default passwords
2. Set secure `JWT_SECRET`
3. Use environment-specific `.env` files
4. Set `NODE_ENV=production`
5. Use `docker-compose.prod.yml` (create separate file)

### Example docker-compose.prod.yml:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    # ... configuration ...
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongodb:27017/finance-tracker
      JWT_SECRET: ${JWT_SECRET}

  frontend:
    build: ./client
    ports:
      - "80:3000"
```

Run with:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Database Backup

### Backup MongoDB data

```bash
docker-compose exec mongodb mongodump --out /data/dump
```

### Restore MongoDB data

```bash
docker-compose exec mongodb mongorestore /data/dump
```

## Performance Tips

1. Use `.dockerignore` to exclude unnecessary files
2. Multi-stage builds for frontend (already implemented)
3. Alpine images for smaller size
4. Cache npm dependencies properly
5. Use health checks

## Health Checks

Both backend and frontend have health checks configured:

```bash
# Check container health
docker-compose ps

# View health status
docker inspect <container-name> | grep -A 5 Health
```

---

For more information, refer to:
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)

**Happy containerizing! 🐳**
