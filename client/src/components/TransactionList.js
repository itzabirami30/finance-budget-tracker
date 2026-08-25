import React from 'react';
import './TransactionList.css';

function TransactionList({ transactions, onDeleteTransaction, loading }) {
  if (loading) {
    return <div className="transaction-list-card">Loading...</div>;
  }

  return (
    <div className="transaction-list-card">
      <h3>Transactions</h3>
      {transactions.length === 0 ? (
        <p className="no-data">No transactions found</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div key={transaction._id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-header">
                  <span className="transaction-category">{transaction.category}</span>
                  <span className={`transaction-type ${transaction.type}`}>
                    {transaction.type === 'income' ? '+' : '-'} ${transaction.amount.toFixed(2)}
                  </span>
                </div>
                {transaction.description && (
                  <p className="transaction-description">{transaction.description}</p>
                )}
                <span className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={() => onDeleteTransaction(transaction._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
