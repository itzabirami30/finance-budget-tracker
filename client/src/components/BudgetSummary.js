import React, { useState } from 'react';
import './BudgetSummary.css';

function BudgetSummary({ budgets, onSetBudget }) {
  const [showForm, setShowForm] = useState(false);
  const [budgetForm, setBudgetForm] = useState({
    category: 'Food',
    limit: '',
  });

  const categories = ['Food', 'Books', 'Travel', 'Utilities', 'Entertainment', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetForm((prev) => ({
      ...prev,
      [name]: name === 'limit' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budgetForm.limit) {
      onSetBudget(budgetForm);
      setBudgetForm({
        category: 'Food',
        limit: '',
      });
      setShowForm(false);
    }
  };

  const getPercentage = (spent, limit) => {
    return limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  };

  const getStatus = (spent, limit) => {
    if (spent > limit) return 'over';
    if (spent / limit > 0.8) return 'warning';
    return 'ok';
  };

  return (
    <div className="budget-summary-card">
      <div className="budget-header">
        <h3>Budget Limits</h3>
        <button
          className="toggle-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '−' : '+'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="budget-form">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={budgetForm.category} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Budget Limit</label>
            <input
              type="number"
              name="limit"
              value={budgetForm.limit}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Set Budget
          </button>
        </form>
      )}

      <div className="budgets-list">
        {budgets.length === 0 ? (
          <p className="no-data">No budgets set</p>
        ) : (
          budgets.map((budget, index) => (
            <div key={index} className={`budget-item status-${getStatus(budget.spent, budget.limit)}`}>
              <div className="budget-info">
                <h4>{budget.category}</h4>
                <p className="budget-amounts">
                  ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                </p>
              </div>
              <div className="budget-bar">
                <div
                  className="budget-progress"
                  style={{ width: `${getPercentage(budget.spent, budget.limit)}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetSummary;
