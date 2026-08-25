import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Charts.css';

function Charts({ transactions, budgets }) {
  // Prepare data for category-wise breakdown
  const categoryData = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const existing = acc.find((item) => item.category === transaction.category);
      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({ category: transaction.category, amount: transaction.amount });
      }
    }
    return acc;
  }, []);

  // Prepare data for income vs expenses
  const incomeExpenseData = [
    {
      type: 'Income',
      amount: transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
    },
    {
      type: 'Expense',
      amount: transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    },
  ];

  // Prepare data for daily spending
  const dailyData = {};
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!dailyData[date]) {
      dailyData[date] = { date, income: 0, expense: 0 };
    }
    if (transaction.type === 'income') {
      dailyData[date].income += transaction.amount;
    } else {
      dailyData[date].expense += transaction.amount;
    }
  });

  const dailyDataArray = Object.values(dailyData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>Spending by Category</h3>
        {categoryData.length === 0 ? (
          <p className="no-data">No expense data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="chart-card">
        <h3>Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Bar dataKey="amount" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card full-width">
        <h3>Daily Spending Trend</h3>
        {dailyDataArray.length === 0 ? (
          <p className="no-data">No transaction data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyDataArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#4CAF50" />
              <Line type="monotone" dataKey="expense" stroke="#f44336" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Charts;
