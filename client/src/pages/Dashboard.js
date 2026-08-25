import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import BudgetSummary from '../components/BudgetSummary';
import Charts from '../components/Charts';
import { transactionAPI, budgetAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentMonth, currentYear]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startDate = new Date(currentYear, currentMonth - 1, 1).toISOString();
      const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59).toISOString();

      const transactionsResponse = await transactionAPI.getAll(startDate, endDate);
      setTransactions(transactionsResponse.data);

      const budgetsResponse = await budgetAPI.getAll(currentMonth, currentYear);
      setBudgets(budgetsResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction) => {
    try {
      await transactionAPI.create(transaction);
      fetchData();
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      fetchData();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  const handleSetBudget = async (budget) => {
    try {
      await budgetAPI.create({
        ...budget,
        month: currentMonth,
        year: currentYear,
      });
      fetchData();
    } catch (err) {
      console.error('Error setting budget:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Header onLogout={handleLogout} />
      <div className="dashboard-container">
        <div className="month-selector">
          <button onClick={() => setCurrentMonth(currentMonth === 1 ? 12 : currentMonth - 1)}>
            ← Previous
          </button>
          <span>
            {new Date(currentYear, currentMonth - 1).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button onClick={() => setCurrentMonth(currentMonth === 12 ? 1 : currentMonth + 1)}>
            Next →
          </button>
        </div>

        <div className="dashboard-content">
          <div className="left-panel">
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <BudgetSummary budgets={budgets} onSetBudget={handleSetBudget} />
          </div>
          <div className="right-panel">
            <Charts transactions={transactions} budgets={budgets} />
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
