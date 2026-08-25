# 💰 Finance & Monthly Budget Tracker

A modern web application to log daily income/expenses and track budget limits with interactive charts and category-wise breakdown.

## ✨ Key Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Transaction Management**: Log daily income and expenses with categorization
- **Budget Tracking**: Set monthly budget limits for each category
- **Interactive Charts**: Visual data representation using Recharts
  - Pie chart for category-wise spending breakdown
  - Bar chart for income vs expenses comparison
  - Line chart for daily spending trends
- **Category-wise Breakdown**: Food, Books, Travel, Utilities, Entertainment, Other
- **Monthly Summaries**: Comprehensive spending reports for each month
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant reflection of changes across the application

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Recharts** - Interactive charting library
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📋 Project Structure

```
finance-budget-tracker/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                    # Express backend
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── middleware/          # Custom middleware
│   ├── server.js
│   └── package.json
├── package.json             # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/itzabirami30/finance-budget-tracker.git
   cd finance-budget-tracker
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Setup environment variables**

   **Server (.env)**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/finance-tracker
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

   **Client (.env)**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```
   - Backend will run on `http://localhost:5000`
   - Frontend will run on `http://localhost:3000`

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - Get all transactions (with filtering)
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Budgets
- `GET /api/budgets` - Get budgets for a month
- `POST /api/budgets` - Create/update budget
- `DELETE /api/budgets/:id` - Delete budget

## 🎨 UI Components

### Header
- Navigation and user info
- Logout functionality

### TransactionForm
- Add new income/expense transactions
- Select category, amount, and date
- Optional description field

### TransactionList
- View all transactions for the month
- Shows category, amount, date
- Delete transaction option

### BudgetSummary
- View budget limits and spending
- Set new budgets
- Visual progress bars
- Status indicators (ok, warning, over)

### Charts
- **Pie Chart**: Category-wise expense breakdown
- **Bar Chart**: Income vs Expenses comparison
- **Line Chart**: Daily spending trends

## 💾 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Transaction
```javascript
{
  userId: ObjectId,
  type: 'income' | 'expense',
  category: String,
  amount: Number,
  description: String,
  date: Date,
  createdAt: Date
}
```

### Budget
```javascript
{
  userId: ObjectId,
  category: String,
  limit: Number,
  month: String,
  year: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes with middleware
- CORS enabled
- Input validation

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interfaces

## 🚧 Future Enhancements

- [ ] Export reports as PDF
- [ ] Recurring transactions
- [ ] Budget alerts and notifications
- [ ] Multi-currency support
- [ ] Spending analytics and insights
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Data backup and restore

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Abirami** - [@itzabirami30](https://github.com/itzabirami30)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Happy budgeting! 💚📊**
