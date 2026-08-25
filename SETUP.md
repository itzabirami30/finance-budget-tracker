# Installation & Setup Guide

## Prerequisites

- **Node.js**: v14 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **MongoDB**: v4.4 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git**: For cloning the repository

## Step-by-Step Setup

### 1. Clone Repository

```bash
git clone https://github.com/itzabirami30/finance-budget-tracker.git
cd finance-budget-tracker
```

### 2. Install Dependencies

#### Option A: Using npm workspaces (Recommended)

```bash
npm run install-all
```

This installs dependencies for both root, client, and server directories.

#### Option B: Manual installation

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

### 3. MongoDB Setup

#### Option A: Local MongoDB

1. Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Windows
   mongod

   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Cloud (Atlas)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/finance-tracker`

### 4. Environment Configuration

#### Server Configuration (.env)

Create `server/.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_very_secret_jwt_key_12345
NODE_ENV=development
```

**Note**: For production, use a strong JWT_SECRET and MongoDB Atlas URI.

#### Client Configuration (.env)

Create `client/.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start Development Servers

#### Option A: Run both servers together

```bash
npm run dev
```

#### Option B: Run separately in different terminals

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

### 6. Access Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

## Testing the Application

### 1. Create Account

1. Navigate to [http://localhost:3000/register](http://localhost:3000/register)
2. Fill in name, email, and password
3. Click "Register"

### 2. Add Transactions

1. Log in with your credentials
2. Fill the "Add Transaction" form:
   - Select Type (Income/Expense)
   - Choose Category
   - Enter Amount
   - Select Date
   - Add optional Description
3. Click "Add Transaction"

### 3. Set Budgets

1. Click "+" button in "Budget Limits" section
2. Select Category
3. Enter Budget Limit
4. Click "Set Budget"

### 4. View Charts

- **Pie Chart**: Shows spending by category
- **Bar Chart**: Compares income vs expenses
- **Line Chart**: Displays daily spending trends

## Build for Production

### Frontend Build

```bash
cd client
npm run build
```

Production files will be in `client/build/`

### Backend Production Start

```bash
cd server
NODE_ENV=production npm start
```

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**:
- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is listening on port 27017

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in client `.env`
- Verify CORS is enabled in `server/server.js`

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
- Change port in `.env`: `PORT=5001`
- Or kill existing process: `lsof -i :5000` (macOS/Linux)

### npm Module Errors

```
Error: Cannot find module 'express'
```

**Solution**:
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Enable Debug Logging

In `server/server.js`, add:
```javascript
const mongoose = require('mongoose');
mongoose.set('debug', true);
```

### Test API with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Hot Reload

- Frontend: React automatically reloads on file changes
- Backend: Uses `nodemon` for automatic restart

## Next Steps

1. Read the [README.md](../README.md) for feature overview
2. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoint details
3. Explore the codebase and customize as needed

---

Happy coding! 🚀
