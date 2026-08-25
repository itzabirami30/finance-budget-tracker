import React, { useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: 'Food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const categories = ['Food', 'Books', 'Travel', 'Utilities', 'Entertainment', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount && formData.category) {
      onAddTransaction(formData);
      setFormData({
        type: 'expense',
        category: 'Food',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <div className="transaction-form-card">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional notes"
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
